from sqlalchemy import Column, Integer, Text, DateTime
from datetime import datetime
from app.database.db import Base


class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)

    question = Column(Text)

    answer = Column(Text)

    case_id = Column(Integer)

    created_at = Column(DateTime, default=datetime.utcnow)