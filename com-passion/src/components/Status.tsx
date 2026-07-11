/** Hiển thị trạng thái tải/lỗi thống nhất cho các trang gọi API. */
export function Loading({ label = 'Đang tải dữ liệu…' }: { label?: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '32px 0' }} aria-live="polite">
      <span className="spinner" style={{ display: 'block', marginBottom: 10 }} />
      <p className="muted loading-note">{label}</p>
    </div>
  );
}

export function ErrorNote({ message }: { message: string }) {
  return (
    <p role="alert" className="rise" style={{ textAlign: 'center', padding: '32px 0', color: '#c0392b' }}>
      ⚠️ {message}
    </p>
  );
}
