from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from app.database.db import Base


class Case(Base):
    __tablename__ = "cases"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(200), nullable=False)

    description = Column(Text)

    status = Column(String(50), default="Open")

    created_at = Column(DateTime, default=datetime.utcnow)