from pathlib import Path
import os
from dotenv import load_dotenv

# DetectAI/backend
BASE_DIR = Path(__file__).resolve().parents[2]

# Load DetectAI/backend/.env
load_dotenv(BASE_DIR / ".env")


class Settings:
    APP_NAME = "DetectAI"

    SECRET_KEY = os.getenv(
        "SECRET_KEY",
        "detectai-secret-key-change-this",
    )

    DATABASE_URL = os.getenv(
        "DATABASE_URL",
        "sqlite:///./detectai.db",
    )

    # Gemini (optional)
    GEMINI_API_KEY = os.getenv(
        "GEMINI_API_KEY",
        "",
    )

    # Groq (recommended free API)
    GROQ_API_KEY = os.getenv(
        "GROQ_API_KEY",
        "",
    )


settings = Settings()