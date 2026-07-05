import { useState } from 'react';
import { api } from '../lib/api';
import { useApi } from '../lib/useApi';
import ProductCard from '../components/ProductCard';
import { Loading, ErrorNote } from '../components/Status';

const filters = [
  { key: 'all', label: 'Tất cả' },
  { key: 'gio', label: 'Giỏ' },
  { key: 'phu-kien', label: 'Phụ kiện' },
] as const;

type SortKey = 'featured' | 'price_asc' | 'price_desc';

export default function Shop() {
  const [cat, setCat] = useState<string>('all');
  const [sort, setSort] = useState<SortKey>('featured');

  const { data: products, loading, error } = useApi(
    () =>
      api.products({
        category: cat === 'all' ? undefined : cat,
        sort: sort === 'featured' ? undefined : sort,
      }),
    [cat, sort]
  );

  const list =
    sort === 'featured' && products
      ? [...products].sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
      : products ?? [];

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
                <option value="price_asc">Giá thấp → cao</option>
                <option value="price_desc">Giá cao → thấp</option>
              </select>
            </label>
          </div>

          {loading && <Loading />}
          {error && <ErrorNote message={error} />}
          {!loading && !error && (
            <div className="grid cols-3 shop__grid">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
