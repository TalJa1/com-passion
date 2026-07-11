from typing import Literal

from fastapi import APIRouter, HTTPException, Query
from sqlalchemy import or_, select

from app.api.deps import SessionDep
from app.models import Product
from app.schemas.catalog import ProductOut

router = APIRouter(prefix="/products", tags=["products"])


@router.get("", response_model=list[ProductOut], response_model_exclude_none=True)
async def list_products(
    session: SessionDep,
    category: Literal["gio", "phu-kien"] | None = None,
    featured: bool | None = None,
    q: str | None = Query(default=None, description="Tìm theo tên, nghệ nhân hoặc vùng miền"),
    sort: Literal["price_asc", "price_desc"] | None = None,
) -> list[Product]:
    stmt = select(Product)
    if category is not None:
        stmt = stmt.where(Product.category == category)
    if featured is not None:
        stmt = stmt.where(Product.featured == featured)
    if q:
        pattern = f"%{q}%"
        stmt = stmt.where(
            or_(Product.name.ilike(pattern), Product.maker.ilike(pattern), Product.region.ilike(pattern))
        )
    if sort == "price_asc":
        stmt = stmt.order_by(Product.price.asc())
    elif sort == "price_desc":
        stmt = stmt.order_by(Product.price.desc())
    else:
        stmt = stmt.order_by(Product.id)
    result = await session.scalars(stmt)
    return list(result)


@router.get("/{slug}", response_model=ProductOut, response_model_exclude_none=True)
async def get_product(slug: str, session: SessionDep) -> Product:
    product = await session.scalar(select(Product).where(Product.slug == slug))
    if product is None:
        raise HTTPException(status_code=404, detail="Không tìm thấy sản phẩm")
    return product
