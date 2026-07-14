import resend
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr

from app.core.config import get_settings

router = APIRouter(tags=["newsletter"])

class SubscribeRequest(BaseModel):
    email: EmailStr

@router.post("/newsletter/subscribe")
async def subscribe_newsletter(payload: SubscribeRequest):
    settings = get_settings()
    
    if not settings.resend_api_key:
        raise HTTPException(status_code=500, detail="Chưa cấu hình Resend API Key")
        
    resend.api_key = settings.resend_api_key
    
    try:
        params = {
            "email": payload.email,
            "unsubscribed": False,
        }
        
        # Resend SDK cho phép bỏ audience_id nếu gọi API mới, nhưng nếu được cung cấp thì dùng.
        if settings.resend_audience_id:
            params["audience_id"] = settings.resend_audience_id
            
        resend.Contacts.create(params)
        return {"message": "Đăng ký thành công"}
        
    except Exception as e:
        error_str = str(e)
        if "already exists" in error_str.lower():
            raise HTTPException(status_code=400, detail="Email này đã được đăng ký trước đó!")
        raise HTTPException(status_code=500, detail=f"Lỗi khi lưu email: {error_str}")
