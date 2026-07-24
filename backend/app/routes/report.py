from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from app.services.report_service import generate_report

router = APIRouter(
    prefix="/report",
    tags=["Report"],
)


class ReportRequest(BaseModel):
    summary: str = ""
    people: list[str] = []
    organizations: list[str] = []
    locations: list[str] = []
    dates: list[str] = []
    keywords: list[str] = []
    insights: list[str] = []


@router.post("/download")
def download_report(data: ReportRequest):

    pdf = generate_report(
        "Evidence",
        data.model_dump(),
    )

    return StreamingResponse(
        pdf,
        media_type="application/pdf",
        headers={
            "Content-Disposition": "attachment; filename=DetectAI_Report.pdf"
        },
    )