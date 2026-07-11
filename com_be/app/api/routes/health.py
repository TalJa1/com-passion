from fastapi import APIRouter

from app.schemas.base import CamelModel

router = APIRouter(tags=["health"])


class HealthOut(CamelModel):
    status: str = "ok"


@router.get("/health", response_model=HealthOut)
async def health() -> HealthOut:
    return HealthOut()
