import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth, type Order } from '../context/AuthContext';
import { formatVND } from '../data/products';
import Photo from '../components/Photo';

const donationOptions = [0, 10000, 20000, 50000];

export default function Cart() {
  const { lines, subtotal, setQty, remove, clear } = useCart();
  const { user, addOrder } = useAuth();
  const navigate = useNavigate();

  const [donation, setDonation] = useState(10000);
  const [custom, setCustom] = useState('');
  const [placed, setPlaced] = useState<Order | null>(null);

  const donateValue = custom ? Math.max(0, Number(custom) || 0) : donation;
  const total = subtotal + donateValue;

  const checkout = () => {
    const order: Order = {
      id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString().slice(0, 10),
      items: lines.map((l) => ({ name: l.product.name, qty: l.qty, price: l.product.price })),
      donation: donateValue,
      total,
    };
    // TODO(backend): tích hợp cổng thanh toán thật (VNPay/Momo/Stripe...).
    if (user) addOrder(order);
    clear();
    setPlaced(order);
    window.scrollTo({ top: 0 });
  };

  if (placed) {
    return (
      <section className="section section--top container">
        <div className="confirm card">
          <span className="confirm__emoji">🌿</span>
          <h1>Cảm ơn bạn!</h1>
          <p className="lead">
            Đơn <strong>{placed.id}</strong> đã được ghi nhận. Bạn vừa giúp các cô chú nghệ nhân
            {placed.donation > 0 && <> và đóng góp thêm <strong>{formatVND(placed.donation)}</strong></>}.
          </p>
          <p className="muted">Tổng cộng: {formatVND(placed.total)}</p>
          <div className="confirm__cta">
            <Link to="/shop" className="btn btn--accent">Tiếp tục mua sắm</Link>
            {user ? (
              <Link to="/tai-khoan" className="btn btn--ghost">Xem hành trình của tôi</Link>
            ) : (
              <Link to="/dang-nhap" className="btn btn--ghost">Tạo tài khoản để lưu đơn</Link>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (lines.length === 0) {
    return (
      <section className="section section--top container">
        <div className="empty">
          <span className="empty__emoji">🛍️</span>
          <h1>Giỏ hàng đang trống</h1>
          <p className="muted">Hãy chọn một chiếc giỏ — và bắt đầu một câu chuyện.</p>
          <Link to="/shop" className="btn btn--accent">Xem sản phẩm</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section section--top">
      <div className="container">
        <h1 className="cart__title">Giỏ hàng của bạn</h1>
        <div className="cart">
          <div className="cart__lines">
            {lines.map((l) => (
              <div key={l.product.id} className="cline card">
                <Photo art={l.product.art} ratio="1 / 1" className="cline__img" />
                <div className="cline__info">
                  <Link to={`/san-pham/${l.product.slug}`} className="cline__name">{l.product.name}</Link>
                  <span className="muted">{l.product.maker} · {l.product.region}</span>
                  <button className="cline__remove" onClick={() => remove(l.product.id)}>Xoá</button>
                </div>
                <div className="cline__qty qty">
                  <button onClick={() => setQty(l.product.id, l.qty - 1)} aria-label="Giảm">−</button>
                  <span>{l.qty}</span>
                  <button onClick={() => setQty(l.product.id, l.qty + 1)} aria-label="Tăng">+</button>
                </div>
                <span className="cline__price">{formatVND(l.product.price * l.qty)}</span>
              </div>
            ))}
          </div>

          <aside className="cart__summary card">
            <h3>Tóm tắt đơn hàng</h3>

            <div className="donate">
              <span className="donate__label">💚 Góp thêm cho cộng đồng?</span>
              <p className="muted donate__hint">100% khoản này vào quỹ bữa trưa cho các em nhỏ.</p>
              <div className="donate__opts">
                {donationOptions.map((d) => (
                  <button
                    key={d}
                    className={`pill ${!custom && donation === d ? 'is-active' : ''}`}
                    onClick={() => { setDonation(d); setCustom(''); }}
                  >
                    {d === 0 ? 'Không' : formatVND(d)}
                  </button>
                ))}
              </div>
              <input
                className="input donate__custom"
                type="number"
                min={0}
                placeholder="Số tiền khác (₫)"
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
              />
            </div>

            <dl className="summary__rows">
              <div><dt>Tạm tính</dt><dd>{formatVND(subtotal)}</dd></div>
              <div><dt>Đóng góp thêm</dt><dd>{formatVND(donateValue)}</dd></div>
              <div className="summary__total"><dt>Tổng cộng</dt><dd>{formatVND(total)}</dd></div>
            </dl>

            <button className="btn btn--accent btn--block btn--lg" onClick={checkout}>
              Thanh toán
            </button>
            <button className="btn btn--ghost btn--block" onClick={() => navigate('/shop')}>
              Tiếp tục mua sắm
            </button>
            <p className="muted summary__note">🔒 Demo — chưa tích hợp thanh toán thật.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
