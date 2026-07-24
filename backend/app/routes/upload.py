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
        "png",
        "jpg",
        "jpeg",
    ]:

        image = Image.open(filepath)

        return pytesseract.image_to_string(image)

    return ""


@router.post("/")
async def upload_file(file: UploadFile = File(...)):

    extension = file.filename.split(".")[-1]

    filename = f"{uuid4()}.{extension}"

    filepath = os.path.join(
        UPLOAD_FOLDER,
        filename,
    )

    with open(filepath, "wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer,
        )

    text = extract_text(filepath)

    if not text.strip():

        raise HTTPException(
            status_code=400,
            detail="Unable to extract text from this file.",
        )

    analysis = analyze_document(text)

    return {

        "filename": filename,

        "original_name": file.filename,

        "message": "Uploaded successfully",

        "analysis": analysis,
    }