from fastapi import APIRouter

from app.api.routes import auth, cron, health, impact, newsletter, orders, products, stories, upload

api_router = APIRouter(prefix="/api")
api_router.include_router(health.router)
api_router.include_router(products.router)
api_router.include_router(stories.router)
api_router.include_router(impact.router)
api_router.include_router(auth.router)
api_router.include_router(orders.router)
api_router.include_router(upload.router)
api_router.include_router(newsletter.router)
api_router.include_router(cron.router)
