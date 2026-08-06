from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.db import Base, engine

# Import models
from app.models.user import User
from app.models.case import Case
from app.models.evidence import Evidence
from app.models.report import Report
from app.models.chat import ChatHistory

# Import routers
from app.routes.auth import router as auth_router
from app.routes.cases import router as case_router
from app.routes.upload import router as upload_router
from app.routes.ai import router as ai_router
from app.routes.chat import router as chat_router
from app.routes.report import router as report_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="DetectAI API",
    description="AI Investigation Intelligence Platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# -----------------------------
# CORS Configuration
# -----------------------------
app.add_middleware(
    CORSMiddleware,
   allow_origins=[
    "http://18.225.5.73",
    "http://18.225.5.73:5173",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(auth_router)
app.include_router(case_router)
app.include_router(upload_router)
app.include_router(ai_router)
app.include_router(chat_router)
app.include_router(report_router)


@app.get("/", tags=["Root"])
def root():
    return {
        "application": "DetectAI",
        "message": "Welcome to DetectAI API",
        "version": "1.0.0",
        "status": "Running",
    }


@app.get("/health", tags=["Health"])
def health():
    return {
        "status": "healthy",
        "database": "connected",
        "api": "running",
    }