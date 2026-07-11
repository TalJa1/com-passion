from fastapi import APIRouter
from sqlalchemy import select

from app.api.deps import SessionDep
from app.models import ImpactStat, Report, UpcomingProject
from app.schemas.catalog import ImpactStatOut, ReportOut, UpcomingProjectOut

router = APIRouter(tags=["impact"])


@router.get("/impact/stats", response_model=list[ImpactStatOut], response_model_exclude_none=True)
async def list_impact_stats(session: SessionDep) -> list[ImpactStat]:
    result = await session.scalars(select(ImpactStat).order_by(ImpactStat.position))
    return list(result)


@router.get("/reports", response_model=list[ReportOut])
async def list_reports(session: SessionDep) -> list[Report]:
    result = await session.scalars(select(Report).order_by(Report.period_date.desc()))
    return list(result)


@router.get("/upcoming", response_model=list[UpcomingProjectOut], response_model_exclude_none=True)
async def list_upcoming(session: SessionDep) -> list[UpcomingProject]:
    result = await session.scalars(select(UpcomingProject).order_by(UpcomingProject.start_date.asc()))
    return list(result)
