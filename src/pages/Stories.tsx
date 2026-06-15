import { Link } from 'react-router-dom';
import { stories } from '../data/stories';
import Photo from '../components/Photo';

export default function Stories() {
  return (
    <>
      <section className="pagehead">
        <div className="container">
          <span className="eyebrow">Câu chuyện</span>
          <h1>Những con người đằng sau dự án</h1>
          <p className="lead">
            Từ đôi tay các cô chú nghệ nhân tới bữa trưa của các em nhỏ — đây là lý do
            mỗi chiếc giỏ tồn tại.
          </p>
        </div>
      </section>

      <section className="section section--top">
        <div className="container">
          <div className="stories">
            {stories.map((s, i) => (
              <Link key={s.id} to={`/cau-chuyen/${s.slug}`} className={`feature ${i % 2 ? 'feature--rev' : ''}`}>
                <Photo art={s.art} ratio="4 / 3" className="feature__img" />
                <div className="feature__text">
                  <span className={`chip ${s.kind === 'school' ? 'chip--clay' : 'chip--green'}`}>
                    {s.kind === 'school' ? 'Các em nhỏ' : 'Nghệ nhân'}
                  </span>
                  <h2>{s.title}</h2>
                  <p className="muted feature__who">{s.person} · {s.location}</p>
                  <p>{s.excerpt}</p>
                  <span className="story-card__more">Đọc tiếp →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
