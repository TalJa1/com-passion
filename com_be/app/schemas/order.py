from datetime import datetime

from pydantic import Field

from app.schemas.base import CamelModel


class OrderItemOut(CamelModel):
    name: str
    qty: int
    price: int


class OrderOut(CamelModel):
    id: str
    date: datetime
    items: list[OrderItemOut]
    donation: int
    total: int


class OrderItemIn(CamelModel):
    product_id: str
    qty: int = Field(ge=1)


class OrderCreate(CamelModel):
    items: list[OrderItemIn] = Field(min_length=1)
    donation: int = Field(default=0, ge=0)
