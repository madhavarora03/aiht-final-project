from fastapi import APIRouter
import torch
from torchvision import transforms
import time
import cv2
from collections import Counter
from PIL import Image
from typing import Annotated
from fastapi import File
import os
import uuid

video_router = APIRouter()


RESOLUTION = 224
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
transformer = transforms.Compose(
    [
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.5], std=[0.5]),
        transforms.Resize((RESOLUTION, RESOLUTION)),
    ]
)

num_classes = 8
class_labels = {
    0: "Abuse",
    1: "Arrest",
    2: "Arson",
    3: "Assault",
    4: "Burglary",
    5: "Explosion",
    6: "Fighting",
    7: "Normal",
}


scripted_model_path = "checkpoints/crime_tcn_jit.pt"
model = torch.jit.load(scripted_model_path, map_location=DEVICE)
model.to(DEVICE)
model.eval()


def preprocess_frame(frame):
    frame_yuv = cv2.cvtColor(frame, cv2.COLOR_BGR2YUV)
    Y_channel, _, _ = cv2.split(frame_yuv)
    pil_frame = Image.fromarray(Y_channel)
    input_tensor = transformer(pil_frame)
    return input_tensor.unsqueeze(0)


def infer_video(video_path):
    cap = cv2.VideoCapture(video_path)
    frame_predictions = []
    start_time = time.time()

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        input_tensor = preprocess_frame(frame)
        with torch.no_grad():
            output = model(input_tensor.to(DEVICE))
            predicted = output.argmax(dim=1).item()
            frame_predictions.append(predicted)

    cap.release()

    if not frame_predictions:
        return "Unknown", time.time() - start_time

    final_prediction = Counter(frame_predictions).most_common(1)[0][0]
    inference_time = time.time() - start_time

    return class_labels.get(final_prediction, "Unknown"), inference_time


@video_router.post("/")
def predict(file: Annotated[bytes, File()]):
    temp_video_path = "temp_video.mp4"
    with open(temp_video_path, "wb") as temp_file:
        temp_file.write(file)

    prediction, inference_time = infer_video(temp_video_path)
    os.remove(temp_video_path)

    return {"predicted_class": prediction, "inference_time": inference_time}
