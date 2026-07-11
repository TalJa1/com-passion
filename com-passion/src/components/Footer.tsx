import { Link } from 'react-router-dom';
import NewsletterSignup from './NewsletterSignup';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <NewsletterSignup />

        <div className="footer__grid">
          <div className="footer__brand">
            <span className="brand brand--light">
              <span className="brand__mark" aria-hidden="true">🧺</span>
              <span className="brand__text">com<span>·</span>passion</span>
            </span>
            <p>
              Mỗi chiếc giỏ là một câu chuyện. Bạn mua hàng thủ công từ bà con vùng cao,
              và đồng hành cùng các em nhỏ tới trường.
            </p>
          </div>

          <nav className="footer__col">
            <h4>Khám phá</h4>
            <Link to="/shop">Sản phẩm</Link>
            <Link to="/cau-chuyen">Câu chuyện</Link>
            <Link to="/minh-bach">Minh bạch & hoá đơn</Link>
            <Link to="/tai-khoan">Tài khoản</Link>
          </nav>

          <nav className="footer__col">
            <h4>Liên hệ</h4>
            <a href="mailto:xinchao@compassion.vn">xinchao@compassion.vn</a>
            <a href="tel:+84900000000">0900 000 000</a>
            <span>Buôn Ma Thuột · Đắk Lắk</span>
          </nav>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} com·passion. Làm bằng đôi tay và tấm lòng.</span>
          <span>Minh bạch · Tử tế · Bền vững</span>
        </div>
      </div>
    </footer>
  );
}
