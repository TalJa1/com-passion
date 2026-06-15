import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { stories } from '../data/stories';
import { impactStats, upcoming } from '../data/impact';
import ProductCard from '../components/ProductCard';
import CountUp from '../components/CountUp';
import Photo from '../components/Photo';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

export default function Home() {
  const featured = products.filter((p) => p.featured);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__text rise">
            <span className="eyebrow">🌿 Thủ công · Tử tế · Minh bạch</span>
            <h1>
              Mỗi chiếc giỏ là <span className="text-accent">một câu chuyện</span>.
            </h1>
            <p className="lead">
              Bạn mua một sản phẩm đan tay từ bà con vùng cao — và đồng hành cùng các em nhỏ
              tới trường. Đơn giản, minh bạch, và ấm áp.
            </p>
            <div className="hero__cta">
              <Link to="/shop" className="btn btn--accent btn--lg">Xem sản phẩm</Link>
              <Link to="/cau-chuyen" className="btn btn--ghost btn--lg">Nghe câu chuyện</Link>
            </div>
            <div className="hero__trust">
              <span>🤲 14 nghệ nhân</span>
              <span>🍱 5.400 bữa trưa</span>
              <span>🧾 Hoá đơn công khai</span>
            </div>
          </div>

          <div className="hero__art rise">
            <Photo
              art={{ from: '#d9b26f', to: '#2e6b4f', emoji: '🧺', realPhotoNote: 'Ảnh cô chú vùng cao bên những chiếc giỏ đan tay' }}
              ratio="4 / 5"
            />
            <div className="hero__floatcard card">
              <strong>86 triệu₫</strong>
              <span className="muted">đã tích luỹ cho cộng đồng</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section mission">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Sứ mệnh của chúng tôi</span>
            <h2>Giúp bạn biết rõ mình đang giúp ai</h2>
            <p>
              com·passion đưa sản phẩm của các cô chú lên mạng, kể câu chuyện đằng sau từng chiếc giỏ,
              và công khai từng đồng đã đi về đâu.
            </p>
          </div>
          <div className="grid cols-3">
            {[
              { e: '🤲', t: 'Trả công xứng đáng', d: 'Phần lớn giá trị mỗi đơn hàng về thẳng tay người làm ra sản phẩm.' },
              { e: '🍱', t: 'Bữa trưa tới trường', d: 'Một phần lợi nhuận thành bữa ăn nóng cho các em nhỏ vùng cao.' },
              { e: '🧾', t: 'Minh bạch tuyệt đối', d: 'Hoá đơn và báo cáo định kỳ được công khai cho mọi người cùng xem.' },
            ].map((m) => (
              <div key={m.t} className="mission__card card">
                <span className="mission__emoji">{m.e}</span>
                <h3>{m.t}</h3>
                <p className="muted">{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="section impact">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow" style={{ color: 'var(--sand-400)' }}>Dấu ấn dự án</span>
            <h2 style={{ color: '#fff' }}>Những con số biết nói</h2>
          </div>
          <div className="impact__grid">
            {impactStats.map((s) => (
              <div key={s.key} className="impact__stat">
                <span className="impact__emoji">{s.emoji}</span>
                <span className="impact__value">
                  <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
                </span>
                <span className="impact__label">{s.label}</span>
              </div>
            ))}
          </div>
          <p className="impact__note">
            <Link to="/minh-bach" className="btn btn--light">Xem hoá đơn & báo cáo →</Link>
          </p>
        </div>
      </section>

      {/* Featured products */}
      <section className="section">
        <div className="container">
          <div className="section-head row">
            <div>
              <span className="eyebrow">Sản phẩm nổi bật</span>
              <h2>Giỏ đan tay, mỗi chiếc một nét</h2>
            </div>
            <Link to="/shop" className="btn btn--ghost">Tất cả sản phẩm →</Link>
          </div>
          <div className="grid cols-3">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Story teaser */}
      <section className="section story-teaser">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Người làm ra sản phẩm</span>
            <h2>Đằng sau mỗi chiếc giỏ là một con người</h2>
          </div>
          <div className="grid cols-3">
            {stories.map((s) => (
              <Link key={s.id} to={`/cau-chuyen/${s.slug}`} className="story-card">
                <Photo art={s.art} ratio="4 / 3" />
                <div className="story-card__body">
                  <span className={`chip ${s.kind === 'school' ? 'chip--clay' : 'chip--green'}`}>
                    {s.kind === 'school' ? 'Các em nhỏ' : 'Nghệ nhân'}
                  </span>
                  <h3>{s.title}</h3>
                  <p className="muted">{s.excerpt}</p>
                  <span className="story-card__more">Đọc tiếp →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming */}
      <section className="section upcoming">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Sắp ra mắt</span>
            <h2>Những điều đang tới</h2>
          </div>
          <div className="upcoming__list">
            {upcoming.map((u) => (
              <div key={u.id} className="upcoming__item card">
                <div className="upcoming__art" style={{ background: `linear-gradient(135deg, ${u.art.from}, ${u.art.to})` }}>
                  <span>{u.art.emoji}</span>
                </div>
                <div className="upcoming__info">
                  <span className="chip chip--green">Bắt đầu {formatDate(u.startDate)}</span>
                  <h3>{u.title}</h3>
                  <p className="muted">{u.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
