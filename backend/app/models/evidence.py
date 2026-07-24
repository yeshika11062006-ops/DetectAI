from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database.db import Base


class Evidence(Base):
    __tablename__ = "evidence"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255))
    filepath = Column(String(255))
    filetype = Column(String(50))
    case_id = Column(Integer)
    uploaded_at = Column(DateTime, default=datetime.utcnow)