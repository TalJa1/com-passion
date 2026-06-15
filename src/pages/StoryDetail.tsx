import { Link, useParams } from 'react-router-dom';
import { getStory, stories } from '../data/stories';
import { products } from '../data/products';
import Photo from '../components/Photo';
import ProductCard from '../components/ProductCard';

export default function StoryDetail() {
  const { slug } = useParams();
  const story = slug ? getStory(slug) : undefined;

  if (!story) {
    return (
      <section className="section container">
        <h1>Không tìm thấy câu chuyện</h1>
        <Link to="/cau-chuyen" className="btn btn--ghost">← Về trang câu chuyện</Link>
      </section>
    );
  }

  const related = products.filter((p) => p.storySlug === story.slug);
  const others = stories.filter((s) => s.slug !== story.slug);

  return (
    <article>
      <section className="section--top container">
        <nav className="crumbs">
          <Link to="/cau-chuyen">Câu chuyện</Link> <span>/</span> <span>{story.title}</span>
        </nav>
      </section>

      <section className="storyhero container">
        <span className={`chip ${story.kind === 'school' ? 'chip--clay' : 'chip--green'}`}>
          {story.kind === 'school' ? 'Các em nhỏ' : 'Nghệ nhân'}
        </span>
        <h1>{story.title}</h1>
        <p className="muted storyhero__who">{story.person} · 📍 {story.location}</p>
      </section>

      <section className="container">
        <Photo art={story.art} ratio="16 / 9" className="storyhero__img" />
      </section>

      <section className="section storybody">
        <div className="container storybody__inner">
          <p className="storybody__lead">{story.excerpt}</p>
          {story.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head center">
              <span className="eyebrow">Ủng hộ trực tiếp</span>
              <h2>Mua sản phẩm từ {story.person.split(',')[0]}</h2>
            </div>
            <div className="grid cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section story-more">
        <div className="container">
          <div className="section-head"><h2>Câu chuyện khác</h2></div>
          <div className="grid cols-2">
            {others.map((s) => (
              <Link key={s.id} to={`/cau-chuyen/${s.slug}`} className="story-card story-card--row">
                <Photo art={s.art} ratio="1 / 1" className="story-card__thumb" />
                <div className="story-card__body">
                  <h3>{s.title}</h3>
                  <p className="muted">{s.excerpt}</p>
                  <span className="story-card__more">Đọc tiếp →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
