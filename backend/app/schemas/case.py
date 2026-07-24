from pydantic import BaseModel
from typing import Optional


class CaseCreate(BaseModel):
    title: str
    description: Optional[str] = None


class CaseUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None


class CaseResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    status: str

    class Config:
        from_attributes = True