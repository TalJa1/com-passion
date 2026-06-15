import { useMemo, useState } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const filters = [
  { key: 'all', label: 'Tất cả' },
  { key: 'gio', label: 'Giỏ' },
  { key: 'phu-kien', label: 'Phụ kiện' },
] as const;

type SortKey = 'featured' | 'price-asc' | 'price-desc';

export default function Shop() {
  const [cat, setCat] = useState<string>('all');
  const [sort, setSort] = useState<SortKey>('featured');

  const list = useMemo(() => {
    let l = products.filter((p) => (cat === 'all' ? true : p.category === cat));
    if (sort === 'price-asc') l = [...l].sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') l = [...l].sort((a, b) => b.price - a.price);
    else l = [...l].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return l;
  }, [cat, sort]);

  return (
    <>
      <section className="pagehead">
        <div className="container">
          <span className="eyebrow">Cửa hàng</span>
          <h1>Sản phẩm thủ công</h1>
          <p className="lead">
            Mỗi sản phẩm gắn với một cô chú nghệ nhân. Bấm vào để nghe câu chuyện đằng sau.
          </p>
        </div>
      </section>

      <section className="section section--top">
        <div className="container">
          <div className="shop__bar">
            <div className="shop__filters">
              {filters.map((f) => (
                <button
                  key={f.key}
                  className={`pill ${cat === f.key ? 'is-active' : ''}`}
                  onClick={() => setCat(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <label className="shop__sort">
              <span className="muted">Sắp xếp</span>
              <select className="input" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
                <option value="featured">Nổi bật</option>
                <option value="price-asc">Giá thấp → cao</option>
                <option value="price-desc">Giá cao → thấp</option>
              </select>
            </label>
          </div>

          <div className="grid cols-3 shop__grid">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
