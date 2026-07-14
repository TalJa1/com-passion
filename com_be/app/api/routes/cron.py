import resend
from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from app.core.config import get_settings

router = APIRouter(tags=["cron"])
security = HTTPBearer()

@router.post("/cron/trigger-newsletter")
async def trigger_newsletter(credentials: HTTPAuthorizationCredentials = Depends(security)):
    settings = get_settings()
    
    # 1. Xác thực bảo mật bằng Secret Token
    if not settings.cron_secret_token or credentials.credentials != settings.cron_secret_token:
        raise HTTPException(status_code=403, detail="Forbidden: Invalid Cron Secret Token")
        
    if not settings.resend_api_key:
        raise HTTPException(status_code=500, detail="Chưa cấu hình Resend API Key")
        
    resend.api_key = settings.resend_api_key
    
    # 2. Tự động tìm Audience ID (Nếu chưa cấu hình trong .env)
    audience_id = settings.resend_audience_id
    if not audience_id:
        try:
            # Lấy danh sách Audiences. SDK v2.x gọi là Audiences, nhưng có thể bị deprecate thành Segments
            # Thử cả 2 cách để đảm bảo an toàn tuyệt đối
            audiences = None
            try:
                audiences = resend.Audiences.list()
            except Exception:
                try:
                    # Gọi trực tiếp qua API nếu SDK chưa support đầy đủ hoặc đổi tên
                    from resend.request import Request
                    request = Request(path="/audiences", params={}, headers={"Authorization": f"Bearer {resend.api_key}"})
                    audiences = request.perform_with_content()
                except Exception:
                    pass

            # Lấy ID của Audience đầu tiên
            if audiences and "data" in audiences and len(audiences["data"]) > 0:
                audience_id = audiences["data"][0]["id"]
            else:
                raise Exception("Không tìm thấy Audience nào trong tài khoản Resend của bạn.")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Lỗi khi tìm Audience: {str(e)}")
            
    # 3. Tiến hành gửi Broadcast
    try:
        html_content = """
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h2 style="color: #2F855A;">Xin chào bạn! 🌿</h2>
            <p>Đây là <strong>bản tin tự động</strong> từ hệ thống của Com-Passion.</p>
            <p>Tháng vừa qua, chúng ta đã gây quỹ thành công nhờ sự đóng góp của bạn. Những chiếc giỏ đan tay đã mang lại thu nhập bền vững cho các nghệ nhân.</p>
            <br/>
            <p>Cảm ơn bạn vì đã luôn đồng hành cùng Com-Passion.</p>
            <hr style="border: 1px solid #E2E8F0; margin: 30px 0;" />
            <p style="font-size: 12px; color: #718096; text-align: center;">Bạn nhận được email này vì đã đăng ký bản tin trên Com-Passion.</p>
        </div>
        """
        
        broadcast = resend.Broadcasts.create({
            "audience_id": audience_id,
            "from": settings.resend_from_email,
            "subject": "🌿 Bản tin tự động từ Com-Passion",
            "html": html_content
        })
        
        return {"message": "Đã gửi bản tin Broadcast thành công!", "broadcast_id": broadcast.get("id")}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lỗi khi gửi Broadcast: {str(e)}")
