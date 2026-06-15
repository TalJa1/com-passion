import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct, formatVND, products } from '../data/products';
import { getStory } from '../data/stories';
import { useCart } from '../context/CartContext';
import Photo from '../components/Photo';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = slug ? getProduct(slug) : undefined;
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <section className="section container">
        <h1>Không tìm thấy sản phẩm</h1>
        <Link to="/shop" className="btn btn--ghost">← Về cửa hàng</Link>
      </section>
    );
  }

  const story = product.storySlug ? getStory(product.storySlug) : undefined;
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);

  const handleAdd = () => {
    add(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
      <section className="section section--top">
        <div className="container">
          <nav className="crumbs">
            <Link to="/shop">Sản phẩm</Link> <span>/</span> <span>{product.name}</span>
          </nav>

          <div className="pdp">
            <div className="pdp__media">
              <Photo art={product.art} ratio="1 / 1" />
            </div>

            <div className="pdp__info">
              <div className="pdp__meta">
                <span className="chip chip--green">{product.maker}</span>
                <span className="muted">📍 {product.region}</span>
              </div>
              <h1>{product.name}</h1>
              <p className="pdp__price">{formatVND(product.price)}</p>
              <p className="pdp__desc">{product.description}</p>

              <ul className="pdp__specs">
                <li><span className="muted">Chất liệu</span><strong>{product.materials.join(' · ')}</strong></li>
                <li><span className="muted">Kích thước</span><strong>{product.size}</strong></li>
                <li>
                  <span className="muted">Còn lại</span>
                  <strong>{product.stock > 0 ? `${product.stock} chiếc` : 'Tạm hết'}</strong>
                </li>
              </ul>

              <div className="pdp__buy">
                <div className="qty">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Giảm">−</button>
                  <span>{qty}</span>
                  <button
                    onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                    aria-label="Tăng"
                  >
                    +
                  </button>
                </div>
                <button className="btn btn--accent btn--lg pdp__add" onClick={handleAdd} disabled={product.stock === 0}>
                  {added ? '✓ Đã thêm vào giỏ' : 'Thêm vào giỏ'}
                </button>
              </div>

              <p className="pdp__assurance muted">
                🤲 Phần lớn giá trị đơn hàng về thẳng tay nghệ nhân · 🍱 Một phần thành bữa trưa cho các em nhỏ
              </p>
            </div>
          </div>
        </div>
      </section>

      {story && (
        <section className="section pdp-story">
          <div className="container">
            <div className="pdp-story__inner">
              <Photo art={story.art} ratio="4 / 3" className="pdp-story__img" />
              <div>
                <span className="eyebrow">Câu chuyện đằng sau</span>
                <h2>{story.title}</h2>
                <p className="muted">{story.excerpt}</p>
                <p className="pdp-story__body">{story.body[0]}</p>
                <Link to={`/cau-chuyen/${story.slug}`} className="btn btn--ghost">Đọc toàn bộ câu chuyện →</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head"><h2>Có thể bạn cũng thích</h2></div>
            <div className="grid cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
