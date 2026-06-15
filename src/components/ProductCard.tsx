import { Link } from 'react-router-dom';
import type { Product } from '../data/types';
import { formatVND } from '../data/products';
import { useCart } from '../context/CartContext';
import Photo from './Photo';

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <article className="pcard">
      <Link to={`/san-pham/${product.slug}`} className="pcard__media">
        <Photo art={product.art} ratio="1 / 1" />
        {product.featured && <span className="chip chip--clay pcard__tag">Nổi bật</span>}
      </Link>
      <div className="pcard__body">
        <div className="pcard__meta">
          <span className="chip chip--green">{product.maker}</span>
          <span className="pcard__region">{product.region}</span>
        </div>
        <h3 className="pcard__name">
          <Link to={`/san-pham/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="pcard__short muted">{product.short}</p>
        <div className="pcard__foot">
          <span className="pcard__price">{formatVND(product.price)}</span>
          <button className="btn btn--accent pcard__add" onClick={() => add(product)}>
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </article>
  );
}
