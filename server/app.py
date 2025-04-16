from fastapi import FastAPI
from .config import check_config
from .router import router

app = FastAPI()
check_config()


app.include_router(router, prefix="/api")
