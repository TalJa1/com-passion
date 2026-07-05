import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, badgeFor } from '../context/AuthContext';
import { formatVND } from '../data/types';
import { Loading } from '../components/Status';

const allBadges = [
  { name: 'Hạt giống', emoji: '🌱', tier: 1, at: 'Đơn hàng đầu tiên' },
  { name: 'Người đồng hành', emoji: '🌿', tier: 2, at: 'Đóng góp 500.000₫' },
  { name: 'Người gieo mầm', emoji: '🌳', tier: 3, at: 'Đóng góp 1.000.000₫' },
];

export default function Account() {
  const { user, loading, logout, refresh, totalContribution } = useAuth();
  const navigate = useNavigate();

  // Làm mới đơn hàng mỗi khi vào trang.
  useEffect(() => {
    if (user) void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <section className="section section--top container">
        <Loading label="Đang khôi phục phiên đăng nhập…" />
      </section>
    );
  }

  if (!user) {
    return (
      <section className="section section--top container">
        <div className="empty">
          <span className="empty__emoji">👤</span>
          <h1>Bạn chưa đăng nhập</h1>
          <p className="muted">Đăng nhập để theo dõi hành trình đóng góp của mình.</p>
          <Link to="/dang-nhap" className="btn btn--accent">Đăng nhập với Google</Link>
        </div>
      </section>
    );
  }

  const badge = badgeFor(totalContribution);
  const meals = Math.floor(totalContribution / 25000); // ~25k/bữa, ước tính

  return (
    <section className="section section--top">
      <div className="container">
        <div className="account__head card">
          <div className="account__id">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt=""
                className="account__avatar"
                style={{ objectFit: 'cover', borderRadius: '50%' }}
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="account__avatar">{user.name.charAt(0).toUpperCase()}</span>
            )}
            <div>
              <h1>Chào {user.name} 👋</h1>
              <p className="muted">{user.email}</p>
            </div>
          </div>
          <button className="btn btn--ghost" onClick={() => { logout(); navigate('/'); }}>Đăng xuất</button>
        </div>

        <div className="account__stats grid cols-3">
          <div className="astat card">
            <span className="muted">Tổng đóng góp</span>
            <strong>{formatVND(totalContribution)}</strong>
          </div>
          <div className="astat card">
            <span className="muted">Đơn hàng</span>
            <strong>{user.orders.length}</strong>
          </div>
          <div className="astat card astat--badge">
            <span className="muted">Huy hiệu hiện tại</span>
            <strong>{badge.emoji} {badge.name}</strong>
          </div>
        </div>

        <div className="account__impact card">
          🍱 Đóng góp của bạn tương đương khoảng <strong>{meals} bữa trưa</strong> cho các em nhỏ vùng cao. Cảm ơn bạn!
        </div>

        <div className="account__grid">
          <section className="account__orders">
            <h2>Lịch sử đơn hàng</h2>
            {user.orders.length === 0 ? (
              <p className="muted">Chưa có đơn hàng nào.</p>
            ) : (
              <div className="orders">
                {user.orders.map((o) => (
                  <article key={o.id} className="order card">
                    <header className="order__head">
                      <strong>{o.id}</strong>
                      <span className="muted">{new Date(o.date).toLocaleDateString('vi-VN')}</span>
                    </header>
                    <ul className="order__items">
                      {o.items.map((it, i) => (
                        <li key={i}><span>{it.name} × {it.qty}</span><span>{formatVND(it.price * it.qty)}</span></li>
                      ))}
                      {o.donation > 0 && (
                        <li className="order__donate"><span>💚 Đóng góp thêm</span><span>{formatVND(o.donation)}</span></li>
                      )}
                    </ul>
                    <footer className="order__foot"><span>Tổng</span><strong>{formatVND(o.total)}</strong></footer>
                  </article>
                ))}
              </div>
            )}
          </section>

          <aside className="account__badges">
            <h2>Huy hiệu</h2>
            <p className="muted">Mua và đóng góp nhiều hơn để mở khoá những cột mốc ấm áp.</p>
            <div className="badges">
              {allBadges.map((b) => {
                const unlocked = badge.tier >= b.tier;
                return (
                  <div key={b.name} className={`badge ${unlocked ? 'is-unlocked' : ''}`}>
                    <span className="badge__emoji">{unlocked ? b.emoji : '🔒'}</span>
                    <div>
                      <strong>{b.name}</strong>
                      <span className="muted">{b.at}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
