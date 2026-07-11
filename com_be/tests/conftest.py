import pytest_asyncio
from httpx import ASGITransport, AsyncClient
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from sqlalchemy.pool import StaticPool

from app.core.security import create_access_token
from app.db.base import Base
from app.db.session import get_session
from app.main import app
from app.models import Product, User


@pytest_asyncio.fixture
async def db_session_factory():
    # In-memory SQLite stands in for Postgres; JSONB columns fall back to JSON.
    engine = create_async_engine(
        "sqlite+aiosqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool
    )
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield async_sessionmaker(engine, expire_on_commit=False)
    await engine.dispose()


@pytest_asyncio.fixture
async def client(db_session_factory):
    async def override_get_session():
        async with db_session_factory() as session:
            yield session

    app.dependency_overrides[get_session] = override_get_session
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac
    app.dependency_overrides.clear()


@pytest_asyncio.fixture
async def seeded_products(db_session_factory):
    products = [
        Product(
            id="p1",
            slug="gio-may-buon-ban",
            name="Giỏ mây Buôn Bản",
            price=185000,
            art={"from": "#d9b26f", "to": "#b88a4a", "emoji": "🧺"},
            category="gio",
            maker="Cô H’Lan",
            region="Buôn Ma Thuột, Đắk Lắk",
            short="Giỏ mây đan tay.",
            description="Giỏ mây đan tay từ sợi mây phơi nắng.",
            materials=["Mây tự nhiên"],
            size="Ø 28cm · cao 24cm",
            stock=5,
            featured=True,
            story_slug="co-hlan-nguoi-giu-nghe-dan",
        ),
        Product(
            id="p5",
            slug="gio-mini-de-ban",
            name="Giỏ mini để bàn",
            price=95000,
            art={"from": "#eef5ef", "to": "#3a8062", "emoji": "🧺"},
            category="phu-kien",
            maker="Chú Tư",
            region="Long An",
            short="Giỏ nhỏ đựng đồ lặt vặt.",
            description="Chiếc giỏ tí hon đựng bút hay đồ trang điểm.",
            materials=["Cỏ bàng"],
            size="Ø 14cm · cao 10cm",
            stock=2,
            featured=False,
        ),
    ]
    async with db_session_factory() as session:
        session.add_all(products)
        await session.commit()
    return products


async def login(db_session_factory, name: str = "Tài Trần", email: str = "taitan1825@gmail.com") -> dict:
    """Create a user directly and mint a JWT, skipping Google verification."""
    async with db_session_factory() as session:
        user = User(name=name, email=email, provider="google")
        session.add(user)
        await session.commit()
        user_id = user.id
    return {"Authorization": f"Bearer {create_access_token(user_id)}"}
