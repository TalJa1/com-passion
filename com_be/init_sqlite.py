import asyncio
from app.db.base import Base
from app.db.session import engine, async_session_factory
from app.models import Product, Story, ImpactStat, Report, UpcomingProject
from app.seed import PRODUCTS, STORIES, IMPACT_STATS, REPORTS, UPCOMING

async def init_db():
    async with engine.begin() as conn:
        # await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    
    async with async_session_factory() as session:
        session.add_all([Product(**p) for p in PRODUCTS])
        session.add_all([Story(**s) for s in STORIES])
        session.add_all([ImpactStat(**i) for i in IMPACT_STATS])
        session.add_all([Report(**r) for r in REPORTS])
        session.add_all([UpcomingProject(**u) for u in UPCOMING])
        await session.commit()
    print("SQLite Database initialized with demo data.")

if __name__ == "__main__":
    asyncio.run(init_db())
