from fastapi import APIRouter, UploadFile, File, HTTPException

from PyPDF2 import PdfReader
from docx import Document
from PIL import Image

import pytesseract
import shutil
import os

from uuid import uuid4

from app.services.ai_service import analyze_document


router = APIRouter(
    prefix="/upload",
    tags=["Upload"],
)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


ALLOWED_EXTENSIONS = {
    "pdf",
    "jpg",
    "jpeg",
    "png",
    "txt",
    "docx",
}


def extract_text(filepath: str) -> str:

    extension = filepath.rsplit(".", 1)[-1].lower()

    # TXT
    if extension == "txt":
        with open(
            filepath,
            "r",
            encoding="utf-8",
            errors="ignore",
        ) as f:
            return f.read()

    # PDF
    if extension == "pdf":
        reader = PdfReader(filepath)

        text = ""

        for page in reader.pages:
            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

        return text

    # DOCX
    if extension == "docx":
        document = Document(filepath)

        text = ""

        for paragraph in document.paragraphs:
            text += paragraph.text + "\n"

        return text

    # JPG / JPEG / PNG
    if extension in {"jpg", "jpeg", "png"}:

        try:
            image = Image.open(filepath)
            image = image.convert("RGB")

            text = pytesseract.image_to_string(image)

            return text

        except Exception as e:
            raise RuntimeError(
                f"Image OCR failed: {str(e)}"
            )

    return ""


@router.post("")
async def upload_file(
    file: UploadFile = File(...)
):

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No file selected.",
        )

    original_name = file.filename

    if "." not in original_name:
        raise HTTPException(
            status_code=400,
            detail="File must have an extension.",
        )

    extension = original_name.rsplit(".", 1)[-1].lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=(
                "Unsupported file type. "
                "Allowed: PDF, JPG, JPEG, PNG, TXT, DOCX."
            ),
        )

    filename = f"{uuid4()}.{extension}"

    filepath = os.path.join(
        UPLOAD_FOLDER,
        filename,
    )

    try:

        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(
                file.file,
                buffer,
            )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Failed to save file: {str(e)}",
        )

    try:

        text = extract_text(filepath)

    except Exception as e:

        if os.path.exists(filepath):
            os.remove(filepath)

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )

    if not text or not text.strip():

        raise HTTPException(
            status_code=400,
            detail=(
                "No readable text was found in this file. "
                "For images, upload a clear JPG or PNG image."
            ),
        )

    try:

        analysis = analyze_document(text)

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"AI analysis failed: {str(e)}",
        )

    return {
        "filename": filename,
        "original_name": original_name,
        "message": "Uploaded successfully",
        "analysis": analysis,
    }