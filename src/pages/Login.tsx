import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    login(name || 'Người bạn mới', email || 'ban@compassion.vn');
    navigate('/tai-khoan');
  };

  const googleMock = () => {
    // TODO(backend): Google OAuth thật cần Client ID + backend xác thực. Xem README.
    login('Minh Anh', 'minhanh@gmail.com');
    navigate('/tai-khoan');
  };

  return (
    <section className="section section--top">
      <div className="container authwrap">
        <div className="auth card">
          <span className="brand__mark auth__mark" aria-hidden="true">🧺</span>
          <h1>Đồng hành cùng dự án</h1>
          <p className="muted">
            Tạo tài khoản để theo dõi hành trình của bạn — lịch sử đơn hàng, tổng đóng góp
            và những huy hiệu ấm áp.
          </p>

          <button className="btn btn--light btn--block google" onClick={googleMock}>
            <span aria-hidden="true">🟦</span> Tiếp tục với Google
          </button>

          <div className="auth__divider"><span>hoặc</span></div>

          <form className="auth__form" onSubmit={submit}>
            <div className="field">
              <label htmlFor="name">Tên của bạn</label>
              <input id="name" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nguyễn Văn A" />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@cua-ban.com" />
            </div>
            <button className="btn btn--accent btn--block" type="submit">Tạo tài khoản / Đăng nhập</button>
          </form>

          <p className="muted auth__note">Demo đăng nhập — dữ liệu lưu tạm trên trình duyệt.</p>
        </div>
      </div>
    </section>
  );
}
