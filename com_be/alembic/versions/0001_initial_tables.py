"""initial tables

Revision ID: 0001
Revises:
Create Date: 2026-07-04

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import JSONB

revision: str = "0001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "products",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("slug", sa.String(), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("price", sa.Integer(), nullable=False),
        sa.Column("art", JSONB(), nullable=False),
        sa.Column("category", sa.String(), nullable=False),
        sa.Column("maker", sa.String(), nullable=False),
        sa.Column("region", sa.String(), nullable=False),
        sa.Column("short", sa.Text(), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("materials", JSONB(), nullable=False),
        sa.Column("size", sa.String(), nullable=False),
        sa.Column("stock", sa.Integer(), nullable=False),
        sa.Column("featured", sa.Boolean(), nullable=False),
        sa.Column("story_slug", sa.String(), nullable=True),
    )
    op.create_index("ix_products_slug", "products", ["slug"], unique=True)
    op.create_index("ix_products_category", "products", ["category"])

    op.create_table(
        "stories",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("slug", sa.String(), nullable=False),
        sa.Column("kind", sa.String(), nullable=False),
        sa.Column("title", sa.String(), nullable=False),
        sa.Column("person", sa.String(), nullable=False),
        sa.Column("location", sa.String(), nullable=False),
        sa.Column("excerpt", sa.Text(), nullable=False),
        sa.Column("body", JSONB(), nullable=False),
        sa.Column("art", JSONB(), nullable=False),
    )
    op.create_index("ix_stories_slug", "stories", ["slug"], unique=True)
    op.create_index("ix_stories_kind", "stories", ["kind"])

    op.create_table(
        "impact_stats",
        sa.Column("key", sa.String(), primary_key=True),
        sa.Column("label", sa.String(), nullable=False),
        sa.Column("value", sa.Integer(), nullable=False),
        sa.Column("suffix", sa.String(), nullable=True),
        sa.Column("prefix", sa.String(), nullable=True),
        sa.Column("emoji", sa.String(), nullable=False),
        sa.Column("position", sa.Integer(), nullable=False),
    )

    op.create_table(
        "reports",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("period", sa.String(), nullable=False),
        sa.Column("title", sa.String(), nullable=False),
        sa.Column("summary", sa.Text(), nullable=False),
        sa.Column("total_raised", sa.Integer(), nullable=False),
        sa.Column("allocations", JSONB(), nullable=False),
        sa.Column("invoice_label", sa.String(), nullable=False),
        sa.Column("period_date", sa.Date(), nullable=False),
    )
    op.create_index("ix_reports_period_date", "reports", ["period_date"])

    op.create_table(
        "upcoming_projects",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("title", sa.String(), nullable=False),
        sa.Column("start_date", sa.Date(), nullable=False),
        sa.Column("note", sa.Text(), nullable=False),
        sa.Column("art", JSONB(), nullable=False),
    )
    op.create_index("ix_upcoming_projects_start_date", "upcoming_projects", ["start_date"])

    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("email", sa.String(), nullable=False),
        sa.Column("avatar", sa.String(), nullable=True),
        sa.Column("provider", sa.String(), nullable=False),
    )
    op.create_index("ix_users_email", "users", ["email"], unique=True)

    op.create_table(
        "orders",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("date", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("donation", sa.Integer(), nullable=False),
        sa.Column("total", sa.Integer(), nullable=False),
    )
    op.create_index("ix_orders_user_id", "orders", ["user_id"])

    op.create_table(
        "order_items",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("order_id", sa.String(), sa.ForeignKey("orders.id"), nullable=False),
        sa.Column("product_id", sa.String(), sa.ForeignKey("products.id"), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("qty", sa.Integer(), nullable=False),
        sa.Column("price", sa.Integer(), nullable=False),
    )
    op.create_index("ix_order_items_order_id", "order_items", ["order_id"])


def downgrade() -> None:
    op.drop_table("order_items")
    op.drop_table("orders")
    op.drop_table("users")
    op.drop_table("upcoming_projects")
    op.drop_table("reports")
    op.drop_table("impact_stats")
    op.drop_table("stories")
    op.drop_table("products")
