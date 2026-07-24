from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.user import User
from app.schemas.user import UserRegister, UserLogin, Token
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
)

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register")
def register(user: UserRegister, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user.email).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully"
    }


@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()

    print("\n========== LOGIN ==========")
    print("Email:", user.email)
    print("Password received:", user.password)
    print("Password length:", len(user.password))

    if db_user:
        print("Stored hash:", db_user.password)
        print("Stored hash length:", len(db_user.password))
    else:
        print("User not found.")

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    try:
        valid = verify_password(user.password, db_user.password)
        print("Password verified:", valid)
    except Exception as e:
        print("VERIFY ERROR:", e)
        raise

    if not valid:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token(
        {"sub": db_user.email}
    )

    return {
        "access_token": token,
        "token_type": "bearer",
    }