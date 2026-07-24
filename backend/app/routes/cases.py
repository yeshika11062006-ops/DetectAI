from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.case import Case
from app.schemas.case import (
    CaseCreate,
    CaseUpdate,
    CaseResponse,
)

router = APIRouter(
    prefix="/cases",
    tags=["Cases"],
)


@router.post("/", response_model=CaseResponse)
def create_case(case: CaseCreate, db: Session = Depends(get_db)):
    new_case = Case(
        title=case.title,
        description=case.description,
    )

    db.add(new_case)
    db.commit()
    db.refresh(new_case)

    return new_case


@router.get("/", response_model=list[CaseResponse])
def get_cases(db: Session = Depends(get_db)):
    return db.query(Case).all()


@router.get("/{case_id}", response_model=CaseResponse)
def get_case(case_id: int, db: Session = Depends(get_db)):
    case = db.query(Case).filter(Case.id == case_id).first()

    if not case:
        raise HTTPException(
            status_code=404,
            detail="Case not found"
        )

    return case


@router.put("/{case_id}", response_model=CaseResponse)
def update_case(
    case_id: int,
    data: CaseUpdate,
    db: Session = Depends(get_db),
):
    case = db.query(Case).filter(Case.id == case_id).first()

    if not case:
        raise HTTPException(
            status_code=404,
            detail="Case not found"
        )

    if data.title is not None:
        case.title = data.title

    if data.description is not None:
        case.description = data.description

    if data.status is not None:
        case.status = data.status

    db.commit()
    db.refresh(case)

    return case


@router.delete("/{case_id}")
def delete_case(case_id: int, db: Session = Depends(get_db)):
    case = db.query(Case).filter(Case.id == case_id).first()

    if not case:
        raise HTTPException(
            status_code=404,
            detail="Case not found"
        )

    db.delete(case)
    db.commit()

    return {
        "message": "Case deleted successfully"
    }