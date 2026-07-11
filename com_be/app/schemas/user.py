from app.schemas.base import CamelModel
from app.schemas.order import OrderOut


class FirebaseLoginRequest(CamelModel):
    # The ID token (JWT) returned by Firebase on the frontend.
    id_token: str


class UserOut(CamelModel):
    name: str
    email: str
    avatar: str | None = None
    orders: list[OrderOut] = []


class UserUpdate(CamelModel):
    name: str | None = None
    avatar: str | None = None


class TokenResponse(CamelModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


class ContributionOut(CamelModel):
    total: int
