# Backend (com_be) - Báo cáo Thay đổi & Nâng cấp

Tài liệu này ghi chú lại tất cả những thay đổi, bổ sung, và tối ưu đã được thực hiện trong dự án backend `com_be` so với bản gốc tại repository ban đầu.

## 1. Tích hợp Cloudinary & Xử lý Ảnh
Tính năng lớn nhất được bổ sung là tích hợp dịch vụ lưu trữ ảnh Cloudinary để phục vụ ảnh thực tế thay vì dùng gradient giả lập.

*   **`app/core/config.py`**:
    *   *Sửa đổi:* Bổ sung các cấu hình môi trường cho Cloudinary (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`).
    *   *Lý do:* Để bảo mật thông tin API và dễ dàng cấu hình qua `.env`.

*   **`app/models/catalog.py`**:
    *   *Sửa đổi:* Bổ sung cột `image_url` (kiểu String, nullable) vào 2 bảng `Product` và `Story`.
    *   *Lý do:* Lưu trữ đường dẫn ảnh thực tế được trả về từ Cloudinary.

*   **`alembic/versions/461887dff3d8_add_image_url.py`**:
    *   *Bổ sung:* File migration mới của Alembic.
    *   *Lý do:* Cập nhật cấu trúc database (thêm cột `image_url`) lên PostgreSQL mà không làm mất dữ liệu hiện tại.

*   **`app/schemas/catalog.py`**:
    *   *Sửa đổi:* Bổ sung trường `image_url` vào `ProductOut` và `StoryOut`.
    *   *Lý do:* Đảm bảo khi frontend gọi API lấy danh sách/chi tiết, backend sẽ trả về thêm đường dẫn ảnh.

*   **`app/api/routes/upload.py` & `app/api/routes/__init__.py`**:
    *   *Bổ sung:* Thêm mới API route `/upload` chuyên xử lý logic upload trực tiếp lên Cloudinary.
    *   *Lý do:* Phục vụ cho tính năng tải ảnh avatar hoặc update hình ảnh từ frontend (nếu cần).

*   **`app/seed.py`**:
    *   *Sửa đổi:* Cập nhật toàn bộ data mồi (seed data).
    *   *Lý do:* Thay thế dữ liệu cũ, chèn sẵn các URL ảnh thật đã được tải lên Cloudinary cho 8 Sản phẩm và 6 Câu chuyện.

## 2. API Đơn hàng & Hóa đơn
*   **`app/api/routes/orders.py`**:
    *   *Sửa đổi:* Tối ưu và sửa lỗi dữ liệu cứng (hardcode) liên quan đến việc in hóa đơn.
    *   *Lý do:* Đảm bảo dữ liệu đổ ra khi in hóa đơn quyên góp phía frontend hoàn toàn chuẩn xác và khớp với Database.

## 3. Hệ thống & Quản lý thư viện
*   **`requirements.txt`**:
    *   *Sửa đổi:* Cập nhật và bổ sung các thư viện thiếu hụt như `cloudinary`, `passlib[bcrypt]`, `bcrypt`.
    *   *Lý do:* Đảm bảo môi trường chạy dự án trơn tru, không bị lỗi thiếu package bảo mật và upload ảnh.

*   **Gọn gàng thư mục**:
    *   *Dọn dẹp:* Xóa các file kịch bản chạy tạm (scratch files) do trợ lý ảo tạo ra trong quá trình làm việc như `fix_account.py`, `init_sqlite.py`, `update_seed.py`, `upload_all.py`, `cloudinary_demo.py`.
    *   *Lý do:* Giữ source code sạch sẽ, không ảnh hưởng tới dự án. Mọi file hiện tại đều chỉ tập trung vào nghiệp vụ của `com_be`.
