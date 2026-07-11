from typing import Literal

from fastapi import APIRouter, HTTPException
from sqlalchemy import select

from app.api.deps import SessionDep
from app.models import Story
from app.schemas.catalog import StoryOut

router = APIRouter(prefix="/stories", tags=["stories"])


@router.get("", response_model=list[StoryOut], response_model_exclude_none=True)
async def list_stories(
    session: SessionDep,
    kind: Literal["artisan", "school"] | None = None,
) -> list[Story]:
    stmt = select(Story).order_by(Story.id)
    if kind is not None:
        stmt = stmt.where(Story.kind == kind)
    result = await session.scalars(stmt)
    return list(result)


@router.get("/{slug}", response_model=StoryOut, response_model_exclude_none=True)
async def get_story(slug: str, session: SessionDep) -> Story:
    story = await session.scalar(select(Story).where(Story.slug == slug))
    if story is None:
        raise HTTPException(status_code=404, detail="Không tìm thấy câu chuyện")
    return story
