from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.settings import settings
from app.api.routes import router as api_router


def create_app() -> FastAPI:
    app = FastAPI(title="SAIMON IA API", version="0.1.0")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            settings.FRONTEND_ORIGIN,
            "http://127.0.0.1:5173",  # fallback común
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(api_router, prefix="/api")
    return app


app = create_app()
