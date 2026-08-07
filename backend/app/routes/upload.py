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

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True,
)


# Allowed evidence file types
ALLOWED_EXTENSIONS = {
    "pdf",
    "jpg",
    "jpeg",
    "png",
    "txt",
    "docx",
}


def extract_text(filepath: str):

    extension = filepath.split(".")[-1].lower()

    # ---------------- TXT ----------------

    if extension == "txt":

        with open(
            filepath,
            "r",
            encoding="utf-8",
            errors="ignore",
        ) as f:

            return f.read()


    # ---------------- PDF ----------------

    elif extension == "pdf":

        reader = PdfReader(filepath)

        text = ""

        for page in reader.pages:

            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

        return text


    # ---------------- DOCX ----------------

    elif extension == "docx":

        document = Document(filepath)

        text = ""

        for para in document.paragraphs:

            text += para.text + "\n"

        return text


    # ---------------- IMAGE OCR ----------------

    elif extension in [
        "jpg",
        "jpeg",
        "png",
    ]:

        image = Image.open(filepath)

        return pytesseract.image_to_string(image)


    return ""


@router.post("")
async def upload_file(
    file: UploadFile = File(...)
):

    # Check filename
    if not file.filename:

        raise HTTPException(
            status_code=400,
            detail="No file selected.",
        )


    # Get extension
    extension = file.filename.split(".")[-1].lower()


    # Check supported file type
    if extension not in ALLOWED_EXTENSIONS:

        raise HTTPException(
            status_code=400,
            detail=(
                "Unsupported file type. "
                "Allowed files: PDF, JPG, JPEG, PNG, TXT and DOCX."
            ),
        )


    # Generate unique filename
    filename = f"{uuid4()}.{extension}"

    filepath = os.path.join(
        UPLOAD_FOLDER,
        filename,
    )


    # Save uploaded file
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


    # Extract text
    try:

        text = extract_text(filepath)

    except Exception as e:

        # Remove failed upload
        if os.path.exists(filepath):
            os.remove(filepath)

        raise HTTPException(
            status_code=400,
            detail=f"Unable to process this file: {str(e)}",
        )


    # Make sure text was extracted
    if not text or not text.strip():

        raise HTTPException(
            status_code=400,
            detail=(
                "Unable to extract text from this file. "
                "For images, please upload a clear JPG or PNG picture."
            ),
        )


    # AI analysis
    try:

        analysis = analyze_document(text)

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"AI analysis failed: {str(e)}",
        )


    return {

        "filename": filename,

        "original_name": file.filename,

        "message": "Uploaded successfully",

        "analysis": analysis,

    }