from typing import TYPE_CHECKING

from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

if TYPE_CHECKING:
    from app.models.order import Order


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String)
    email: Mapped[str] = mapped_column(String, unique=True, index=True)
    avatar: Mapped[str | None] = mapped_column(String, nullable=True)
    # Auth provider ("email" today, "google" once OAuth lands).
    provider: Mapped[str] = mapped_column(String, default="email")

    orders: Mapped[list["Order"]] = relationship(back_populates="user", order_by="Order.date.desc()")
