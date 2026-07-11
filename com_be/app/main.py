from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import api_router
from app.core.config import get_settings
import firebase_admin
from firebase_admin import credentials

settings = get_settings()

if settings.firebase_credentials_path:
    cred = credentials.Certificate(settings.firebase_credentials_path)
    firebase_admin.initialize_app(cred)
else:
    # Use default credentials or allow environment variables, but explicitly provide projectId
    # so verify_id_token can work without full credentials.
    options = {}
    if settings.firebase_project_id:
        options["projectId"] = settings.firebase_project_id
    firebase_admin.initialize_app(options=options if options else None)

app = FastAPI(
    title="Com-Passion API",
    description="API cho cửa hàng thủ công minh bạch com-passion — giỏ đan tay & câu chuyện cộng đồng.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
