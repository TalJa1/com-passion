import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api, ApiError } from '../lib/api';
import { useApi } from '../lib/useApi';
import { formatVND } from '../data/types';
import { useCart } from '../context/CartContext';
import Photo from '../components/Photo';
import ProductCard from '../components/ProductCard';
import { Loading, ErrorNote } from '../components/Status';

export default function ProductDetail() {
  const { slug } = useParams();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const { data: product, loading, error } = useApi(
    async () => {
      try {
        return await api.product(slug!);
      } catch (err) {
        if (err instanceof ApiError && err.status === 404) return null;
        throw err;
      }
    },
    [slug]
  );

  const { data: story } = useApi(
    async () => {
      if (!product?.storySlug) return null;
      try {
        return await api.story(product.storySlug);
      } catch {
        return null;
      }
    },
    [product?.storySlug]
  );

  const { data: related } = useApi(
    async () => {
      if (!product) return [];
      const list = await api.products({ category: product.category });
      return list.filter((p) => p.id !== product.id).slice(0, 3);
    },
    [product?.id]
  );

  if (loading) {
    return (
      <section className="section section--top container">
        <Loading />
      </section>
    );
  }

  if (error) {
    return (
      <section className="section container">
        <ErrorNote message={error} />
        <Link to="/shop" className="btn btn--ghost">← Về cửa hàng</Link>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="section container">
        <h1>Không tìm thấy sản phẩm</h1>
        <Link to="/shop" className="btn btn--ghost">← Về cửa hàng</Link>
      </section>
    );
  }

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

      {related && related.length > 0 && (
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
