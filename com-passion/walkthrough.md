# Frontend (com-passion) - Báo cáo Thay đổi & Nâng cấp

Tài liệu này ghi chú lại tất cả những thay đổi, bổ sung UI/UX, logic và tích hợp API đã được thực hiện trong dự án frontend `com-passion` so với bản gốc tại repository ban đầu.

## 1. Giao diện & Trải nghiệm Người dùng (UI/UX)
*   **Hiệu ứng chào mừng (Welcome Popup)**
    *   *File bổ sung:* `src/components/WelcomePopup.tsx`
    *   *Sửa đổi:* `src/App.tsx`, `src/context/AuthContext.tsx`
    *   *Lý do:* Tạo cảm giác chân thành, ấm áp. Khi người dùng đăng nhập lần đầu tiên, hệ thống sẽ hiện popup chúc mừng kèm hiệu ứng pháo hoa tràn màn hình để tri ân sự đóng góp.

*   **Hiển thị Ảnh thực tế (thay vì gradient màu)**
    *   *Sửa đổi:* `src/components/Photo.tsx`, `src/data/types.ts`, và toàn bộ file Pages (`Home`, `ProductDetail`, `Stories`, `StoryDetail`, `Shop`, `Cart`).
    *   *Lý do:* Tích hợp dữ liệu `imgUrl` từ backend trả về. Đã xử lý kỹ thuật tự động tối ưu ảnh (format webp, quality tự động) từ Cloudinary để không bị giật lag khi kéo trang. Vẫn giữ lại giao diện màu gradient để làm fallback (dự phòng) trong trường hợp ảnh bị lỗi.

*   **Tối ưu Loading Skeleton (Chống Layout Shift)**
    *   *File bổ sung:* `src/components/Skeleton.tsx`, `src/components/Skeleton.css`
    *   *Sửa đổi:* `src/pages/ProductDetail.tsx`, `src/pages/StoryDetail.tsx`, `src/pages/Stories.tsx`, `src/pages/Account.tsx`
    *   *Lý do:* Tránh hiện tượng nội dung nhảy giật cục (layout shift) khi tải dữ liệu phụ (sản phẩm liên quan, câu chuyện khác). Bổ sung thêm biến `isRev` để skeleton của trang "Câu chuyện" khớp 100% với bố cục so le (trái-phải) của dữ liệu thật.

*   **Tối ưu CSS & Animation**
    *   *Sửa đổi:* `src/components.css`, `src/components_fixed.css`
    *   *Lý do:* Tối ưu hóa hiệu ứng mở menu trên mobile (tránh giật lag bằng `clip-path` và `will-change`). Khắc phục lỗi con trỏ chuột tùy chỉnh bị sai lệch bằng cách bổ sung class `.interactive` dùng thống nhất cho các phần tử có thể tương tác (nút bấm, link, hình ảnh).

## 2. Tính năng & Nghiệp vụ Mới
*   **In hóa đơn điện tử (Print Invoice)**
    *   *File bổ sung:* `src/components/Invoice.tsx`, `src/components/Invoice.css`
    *   *Lý do:* Bổ sung tính năng cho phép người dùng in sao kê đóng góp từ trang Giỏ hàng/Tài khoản để minh bạch và lưu trữ cá nhân.
    *   *Thư viện bổ sung:* `react-to-print` (được ghi nhận trong `package.json`).

*   **Upload & Thay đổi Avatar**
    *   *File bổ sung:* `src/components/AvatarUploader.tsx`
    *   *Lý do:* Cho phép người dùng tải lên hình ảnh đại diện cá nhân, kết nối với API upload của hệ thống.

*   **Thống kê Đóng góp (Transparency)**
    *   *File bổ sung:* `src/components/ReportCard.tsx`, `src/pages/Transparency.tsx`
    *   *Lý do:* Xây dựng trang báo cáo minh bạch tài chính. Các con số được hiển thị trực quan thông qua component đếm số tự động (`CountUp.tsx`).

## 3. Hệ thống & Quản lý
*   **`package.json`**:
    *   *Sửa đổi:* Đã thêm đầy đủ các thư viện cần thiết phục vụ UI/UX (`firebase`, `framer-motion`, `lucide-react`, `lenis`, `react-to-print`, `@react-oauth/google`).
*   **Gọn gàng thư mục**:
    *   *Dọn dẹp:* Xóa toàn bộ file chạy tạm như `fix.py`, `restore.py`. Đảm bảo trong thư mục `com-passion` chỉ tồn tại code Frontend thuần tuý.
