import { reports, impactStats, formatVNDfull } from '../data/impact';
import CountUp from '../components/CountUp';

export default function Transparency() {
  return (
    <>
      <section className="pagehead">
        <div className="container">
          <span className="eyebrow">Minh bạch</span>
          <h1>Từng đồng, công khai</h1>
          <p className="lead">
            Chúng tôi tin rằng lòng tin được xây từ sự minh bạch. Dưới đây là báo cáo định kỳ
            và hoá đơn của dự án.
          </p>
        </div>
      </section>

      <section className="section section--top">
        <div className="container">
          <div className="grid cols-4 tstats">
            {impactStats.slice(0, 4).map((s) => (
              <div key={s.key} className="tstat card">
                <span className="impact__emoji">{s.emoji}</span>
                <strong><CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} /></strong>
                <span className="muted">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Báo cáo định kỳ</span>
            <h2>Tiền đã đi về đâu?</h2>
          </div>

          <div className="reports">
            {reports.map((r) => (
              <article key={r.id} className="report card">
                <header className="report__head">
                  <div>
                    <span className="chip chip--green">{r.period}</span>
                    <h3>{r.title}</h3>
                    <p className="muted">{r.summary}</p>
                  </div>
                  <div className="report__total">
                    <span className="muted">Tổng dòng tiền</span>
                    <strong>{formatVNDfull(r.totalRaised)}</strong>
                  </div>
                </header>

                <div className="report__bar" role="img" aria-label="Phân bổ dòng tiền">
                  {r.allocations.map((a) => (
                    <span
                      key={a.label}
                      className="report__seg"
                      style={{ flex: a.amount, background: a.color }}
                      title={`${a.label}: ${formatVNDfull(a.amount)}`}
                    />
                  ))}
                </div>

                <ul className="report__legend">
                  {r.allocations.map((a) => (
                    <li key={a.label}>
                      <span className="dot" style={{ background: a.color }} />
                      <span>{a.label}</span>
                      <strong>{formatVNDfull(a.amount)}</strong>
                      <span className="muted">
                        {Math.round((a.amount / r.totalRaised) * 100)}%
                      </span>
                    </li>
                  ))}
                </ul>

                <footer className="report__foot">
                  {/* TODO(backend): liên kết tới file hoá đơn/sao kê thật (PDF). */}
                  <a className="btn btn--ghost" href="#" onClick={(e) => e.preventDefault()}>
                    🧾 {r.invoiceLabel}
                  </a>
                  <span className="muted report__hint">Bản demo — file thật sẽ được đính kèm.</span>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
