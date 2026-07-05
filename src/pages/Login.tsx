import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { errorMessage } from '../lib/api';

export default function Login() {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleCredential = async (credential?: string) => {
    if (!credential) {
      setError('Không nhận được thông tin đăng nhập từ Google. Vui lòng thử lại.');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await loginWithGoogle(credential);
      navigate('/tai-khoan');
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="section section--top">
      <div className="container authwrap">
        <div className="auth card">
          <span className="brand__mark auth__mark" aria-hidden="true">🧺</span>
          <h1>Đồng hành cùng dự án</h1>
          <p className="muted">
            Đăng nhập bằng Google để theo dõi hành trình của bạn — lịch sử đơn hàng, tổng đóng góp
            và những huy hiệu ấm áp. Tài khoản được tạo tự động ở lần đăng nhập đầu tiên.
          </p>

          <div className="auth__google" style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
            <GoogleLogin
              onSuccess={(res) => handleCredential(res.credential)}
              onError={() => setError('Đăng nhập Google thất bại. Vui lòng thử lại.')}
              text="continue_with"
            />
          </div>

          {busy && <p className="muted">Đang đăng nhập…</p>}
          {error && <p className="auth__error" style={{ color: '#c0392b' }} role="alert">{error}</p>}
        </div>
      </div>
    </section>
  );
}
