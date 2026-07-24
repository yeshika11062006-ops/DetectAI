from fastapi import APIRouter
from pydantic import BaseModel

from app.services.ai_service import chat_with_evidence

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


class ChatRequest(BaseModel):
    evidence: str
    question: str


@router.post("/")
def chat(req: ChatRequest):
    answer = chat_with_evidence(
        req.evidence,
        req.question,
    )

    return {
        "answer": answer
    }