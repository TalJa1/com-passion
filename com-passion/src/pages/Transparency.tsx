import { motion } from 'framer-motion';
import { api } from '../lib/api';
import { useApi } from '../lib/useApi';
import { formatVND } from '../data/types';
import CountUp from '../components/CountUp';
import { Loading, ErrorNote } from '../components/Status';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function Transparency() {
  const statsState = useApi(() => api.impactStats());
  const reportsState = useApi(() => api.reports());

  return (
    <>
      <section className="pagehead">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.span variants={fadeUp} className="eyebrow">Minh bạch</motion.span>
            <motion.h1 variants={fadeUp}>Từng đồng, công khai</motion.h1>
            <motion.p variants={fadeUp} className="lead">
              Chúng tôi tin rằng lòng tin được xây từ sự minh bạch. Dưới đây là báo cáo định kỳ
              và hoá đơn của dự án.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="section section--top">
        <div className="container">
          {statsState.loading && <Loading />}
          {statsState.error && <ErrorNote message={statsState.error} />}
          {statsState.data && (
            <motion.div className="grid cols-4 tstats" initial="hidden" animate="visible" variants={staggerContainer}>
              {statsState.data.slice(0, 4).map((s) => (
                <motion.div key={s.key} variants={fadeUp} className="tstat card">
                  <span className="impact__emoji">{s.emoji}</span>
                  <strong><CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} /></strong>
                  <span className="muted">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <motion.div className="section-head" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
            <span className="eyebrow">Báo cáo định kỳ</span>
            <h2>Tiền đã đi về đâu?</h2>
          </motion.div>

          {reportsState.loading && <Loading />}
          {reportsState.error && <ErrorNote message={reportsState.error} />}
          {reportsState.data && (
            <motion.div className="reports" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              {reportsState.data.map((r) => (
                <motion.article key={r.id} variants={fadeUp} className="report card">
                  <header className="report__head">
                    <div>
                      <span className="chip chip--green">{r.period}</span>
                      <h3>{r.title}</h3>
                      <p className="muted">{r.summary}</p>
                    </div>
                    <div className="report__total">
                      <span className="muted">Tổng dòng tiền</span>
                      <strong>{formatVND(r.totalRaised)}</strong>
                    </div>
                  </header>

                  <div className="report__bar" role="img" aria-label="Phân bổ dòng tiền">
                    {r.allocations.map((a) => (
                      <motion.span
                        initial={{ flex: 0 }}
                        whileInView={{ flex: a.amount }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        key={a.label}
                        className="report__seg"
                        style={{ background: a.color }}
                        title={`${a.label}: ${formatVND(a.amount)}`}
                      />
                    ))}
                  </div>

                  <ul className="report__legend">
                    {r.allocations.map((a) => (
                      <li key={a.label}>
                        <span className="dot" style={{ background: a.color }} />
                        <span>{a.label}</span>
                        <strong>{formatVND(a.amount)}</strong>
                        <span className="muted">
                          {Math.round((a.amount / r.totalRaised) * 100)}%
                        </span>
                      </li>
                    ))}
                  </ul>

                  <footer className="report__foot">
                    <a className="btn btn--ghost interactive" href="#" onClick={(e) => e.preventDefault()}>
                      🧾 {r.invoiceLabel}
                    </a>
                  </footer>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
