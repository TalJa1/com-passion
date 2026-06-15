import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/', label: 'Trang chủ', end: true },
  { to: '/shop', label: 'Sản phẩm' },
  { to: '/cau-chuyen', label: 'Câu chuyện' },
  { to: '/minh-bach', label: 'Minh bạch' },
];

export default function Navbar() {
  const { count } = useCart();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="container nav__inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand__mark" aria-hidden="true">🧺</span>
          <span className="brand__text">
            com<span>·</span>passion
          </span>
        </Link>

        <nav className={`nav__links ${open ? 'is-open' : ''}`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => (isActive ? 'nav__link is-active' : 'nav__link')}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav__actions">
          <Link to="/tai-khoan" className="nav__icon" aria-label="Tài khoản">
            {user ? <span className="nav__avatar">{user.name.charAt(0).toUpperCase()}</span> : '👤'}
          </Link>
          <Link to="/gio-hang" className="nav__icon nav__cart" aria-label="Giỏ hàng">
            🛍️
            {count > 0 && <span className="nav__badge">{count}</span>}
          </Link>
          <button
            className="nav__burger"
            aria-label="Mở menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
