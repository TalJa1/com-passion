# com·passion 🧺

Website thương mại xã hội — bán giỏ đan tay từ bà con vùng cao, kể câu chuyện đằng sau
mỗi sản phẩm, và minh bạch dòng tiền hỗ trợ các em nhỏ tới trường.

> Mỗi chiếc giỏ là một câu chuyện.

## Chạy dự án

```bash
npm install
npm run dev      # chạy dev server
npm run build    # build production (đã type-check sạch)
npm run preview  # xem thử bản build
```

Tech: **React 19 + TypeScript + Vite + React Router**. Trạng thái (giỏ hàng, tài khoản)
lưu tạm trong `localStorage` — chưa cần backend để xem toàn bộ giao diện.

## Tông màu & phong cách

- Xanh lá cây (chủ đạo) + cam ấm / vàng đất.
- Tối giản, nhiều khoảng thở, bo góc mềm.
- Tokens trong [`src/index.css`](src/index.css), components trong [`src/components.css`](src/components.css).

## Cấu trúc trang

| Trang | Đường dẫn | Mô tả |
|------|-----------|------|
| Trang chủ | `/` | Sứ mệnh · impact (số liệu động) · sản phẩm nổi bật · câu chuyện · **sắp ra mắt** · newsletter |
| Sản phẩm | `/shop` | Lọc theo loại, sắp xếp theo giá |
| Chi tiết SP | `/san-pham/:slug` | Giá, mô tả, câu chuyện người làm ra |
| Câu chuyện | `/cau-chuyen` | Nghệ nhân + các em nhỏ ở trường |
| Chi tiết câu chuyện | `/cau-chuyen/:slug` | Bài viết đầy đủ + sản phẩm liên quan |
| Minh bạch | `/minh-bach` | Hoá đơn + báo cáo định kỳ, biểu đồ phân bổ dòng tiền |
| Giỏ hàng | `/gio-hang` | **Donate thêm khi checkout**, xác nhận đơn |
| Đăng nhập | `/dang-nhap` | Google (giả lập) hoặc email |
| Tài khoản | `/tai-khoan` | Lịch sử đơn, tổng đóng góp, **huy hiệu** |

Dữ liệu mẫu nằm trong [`src/data/`](src/data/) — sửa ở đây để đổi sản phẩm/câu chuyện/báo cáo.

## ⚠️ Những phần cần backend / xử lý thêm (note lại cho bạn)

Mình đã làm trọn vẹn phần giao diện (frontend). Các hạng mục dưới đây **cần dịch vụ
backend / bên thứ ba** nên hiện đang ở dạng demo, đã đánh dấu `TODO(backend)` trong code:

1. **Đăng nhập Google thật** — `src/pages/Login.tsx`. Cần Google OAuth Client ID + một
   backend (hoặc Firebase/Supabase Auth) để xác thực. Hiện đang đăng nhập giả lập, lưu `localStorage`.
2. **Thanh toán thật** — `src/pages/Cart.tsx`. Cần tích hợp cổng (VNPay / Momo / Stripe).
   Hiện checkout chỉ tạo đơn mẫu.
3. **Tài khoản & đơn hàng bền vững** — đang lưu `localStorage`. Cần database thật để
   theo dõi hành trình người dùng qua nhiều thiết bị.
4. **Gửi newsletter đầu tháng** — `src/components/NewsletterSignup.tsx`. Cần dịch vụ email
   (Mailchimp / Resend / Sendgrid) + lưu danh sách đăng ký.
5. **Hoá đơn / sao kê PDF** — `src/pages/Transparency.tsx`. Đang là nút demo; cần upload
   và liên kết file thật.
6. **Ảnh thật** — hiện dùng ảnh minh hoạ (gradient + emoji). Mỗi ảnh cần chụp có ghi chú
   trong `realPhotoNote` (xem `src/data/*.ts`), ví dụ:
   - Cô H'Lan đang đan mây trước hiên, ánh sáng sáng sớm.
   - Chú Tư bên gánh hàng rong buổi đêm, đèn vàng ấm.
   - Các em nhỏ 8–10 tuổi vùng cao đang ăn trưa ở trường.
   Thay `art` bằng đường dẫn ảnh và cập nhật component [`Photo`](src/components/Photo.tsx).

### Quyết định cần bạn xác nhận
- **Nội dung & số liệu** hiện là mẫu (tên cô chú, số tiền, báo cáo). Cần thay bằng dữ liệu thật.
- **Triển khai**: vì dùng React Router, khi deploy tĩnh (Netlify/Vercel) cần bật SPA fallback
  (rewrite mọi route về `index.html`).
