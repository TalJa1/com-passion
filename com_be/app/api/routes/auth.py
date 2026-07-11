import httpx
from fastapi import APIRouter, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.api.deps import CurrentUserDep, SessionDep
from app.core.config import get_settings
from app.core.security import create_access_token
from app.models import Order, User
from app.schemas.user import FirebaseLoginRequest, TokenResponse, UserOut, UserUpdate
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

router = APIRouter(prefix="/auth", tags=["auth"])

async def _load_user_with_orders(session: SessionDep, user_id: int) -> User:
    stmt = (
        select(User)
        .where(User.id == user_id)
        .options(selectinload(User.orders).selectinload(Order.items))
    )
    return (await session.scalars(stmt)).one()


@router.post("/firebase", response_model=TokenResponse, response_model_exclude_none=True)
async def firebase_login(payload: FirebaseLoginRequest, session: SessionDep) -> TokenResponse:
    """Sign in with Firebase: verify the ID token, upsert the user, issue our JWT.

    Firebase handles Email/Password, Google Auth, etc.
    We just verify the token and mirror the user profile.
    """
    try:
        settings = get_settings()
        if not settings.firebase_project_id:
            raise ValueError("Cấu hình thiếu FIREBASE_PROJECT_ID")
        request = google_requests.Request()
        claims = id_token.verify_firebase_token(payload.id_token, request, audience=settings.firebase_project_id)
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Firebase token không hợp lệ: {str(e)}")

    if not claims.get("email_verified") and claims.get("firebase", {}).get("sign_in_provider") == "password":
        # Note: If you want to enforce email verification for password accounts:
        # raise HTTPException(status_code=403, detail="Vui lòng kiểm tra email để xác thực tài khoản")
        pass

    email = claims["email"].lower()
    name = claims.get("name") or email.split("@")[0]
    avatar = claims.get("picture")
    provider = claims.get("firebase", {}).get("sign_in_provider", "firebase")

    user = await session.scalar(select(User).where(User.email == email))
    if user is None:
        user = User(name=name, email=email, avatar=avatar, provider=provider)
        session.add(user)
    else:
        # User is logging in again. Update their local info with latest Firebase info.
        # But wait, if they updated their profile locally via PATCH /me, we don't want to 
        # overwrite it here unless Firebase has a different name? Actually Firebase is the source of truth.
        user.name = name
        user.avatar = avatar
        user.provider = provider
    await session.commit()

    user = await _load_user_with_orders(session, user.id)
    return TokenResponse(access_token=create_access_token(user.id), user=UserOut.model_validate(user))


@router.get("/me", response_model=UserOut, response_model_exclude_none=True)
async def me(current_user: CurrentUserDep, session: SessionDep) -> UserOut:
    user = await _load_user_with_orders(session, current_user.id)
    return UserOut.model_validate(user)


@router.patch("/me", response_model=UserOut, response_model_exclude_none=True)
async def update_me(payload: UserUpdate, current_user: CurrentUserDep, session: SessionDep) -> UserOut:
    user = await _load_user_with_orders(session, current_user.id)
    if payload.name is not None:
        user.name = payload.name
    if payload.avatar is not None:
        user.avatar = payload.avatar
    await session.commit()
    return UserOut.model_validate(user)
