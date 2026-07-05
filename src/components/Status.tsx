/** Hiển thị trạng thái tải/lỗi thống nhất cho các trang gọi API. */
export function Loading({ label = 'Đang tải dữ liệu…' }: { label?: string }) {
  return <p className="muted" style={{ textAlign: 'center', padding: '32px 0' }}>⏳ {label}</p>;
}

export function ErrorNote({ message }: { message: string }) {
  return (
    <p role="alert" style={{ textAlign: 'center', padding: '32px 0', color: '#c0392b' }}>
      ⚠️ {message}
    </p>
  );
}
