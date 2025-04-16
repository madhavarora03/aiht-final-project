from fastapi import APIRouter
from .video import video_router

router = APIRouter()
router.include_router(video_router, prefix="/videos")
