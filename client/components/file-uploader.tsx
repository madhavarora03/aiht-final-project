"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { CircleArrowDown, RocketIcon } from "lucide-react";
import { useNotification } from "./notification";
import axios from "axios";

export default function FileUploader() {
  const { showNotification } = useNotification();
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await axios.post(
          "http://localhost:8000/api/videos/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(res);
        showNotification(
          `Uploaded file '${file.name}' successfully!`,
          "success"
        );
      } catch (error) {
        console.error(error);
        showNotification("Failed to upload file!", "error");
      }
    } else {
      showNotification("Invalid file type!", "error");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      accept: {
        "video/mp4": [".mp4"],
      },
    });

  return (
    <div className="flex flex-col gap-4 items-center max-w-7xl mx-auto">
      <div
        {...getRootProps()}
        className={`p-10 border-2 border-dashed mt-10 w-[90%] border-primary text-primary rounded-lg h-96 flex items-center justify-center ${
          isFocused || isDragAccept ? "bg-primary/30" : "bg-primary/10"
        }`}
      >
        <input {...getInputProps()} disabled={false} />
        <div className="flex flex-col items-center justify-center">
          {isDragActive ? (
            <>
              <RocketIcon className="w-20 h-20 animate-ping" />
              <p>Drop the files here ...</p>
            </>
          ) : (
            <>
              <CircleArrowDown className="w-20 h-20 animate-bounce" />
              <p>
                Drag {"'"}n{"'"} drop some files here, or click to select files
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
