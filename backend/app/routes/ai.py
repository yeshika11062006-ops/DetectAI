from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from app.services.ai_service import (
    analyze_document,
    stream_analysis,
)

router = APIRouter(
    prefix="/ai",
    tags=["AI"],
)


class AnalyzeRequest(BaseModel):
    text: str


# -------------------------
# Normal AI Analysis
# -------------------------
@router.post("/analyze")
def analyze(req: AnalyzeRequest):

    result = analyze_document(req.text)

    return {
        "analysis": result
    }


# -------------------------
# Streaming AI Response
# -------------------------
@router.post("/stream")
def stream(req: AnalyzeRequest):

    return StreamingResponse(
        stream_analysis(req.text),
        media_type="text/plain",
    )