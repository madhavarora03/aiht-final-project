from fastapi import APIRouter
from .video import video_router
from .chatbot import chat_router
from .fir import fir_router

router = APIRouter()
router.include_router(video_router, prefix="/videos")
router.include_router(chat_router, prefix="/chat")
router.include_router(fir_router, prefix="/fir")
