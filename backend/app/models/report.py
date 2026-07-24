from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database.db import Base


class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)

    report_name = Column(String(255))

    report_path = Column(String(255))

    case_id = Column(Integer)

    created_at = Column(DateTime, default=datetime.utcnow)