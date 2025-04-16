from fastapi import FastAPI
from .config import check_config
from .router import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
check_config()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")
