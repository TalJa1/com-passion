import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO(backend): gửi email tới dịch vụ newsletter thật (Mailchimp/Resend...).
    setDone(true);
  };

  return (
    <div className="newsletter card">
      <div className="newsletter__text">
        <span className="eyebrow">Thư đầu tháng</span>
        <h3>Nhận câu chuyện của tháng qua email</h3>
        <p className="muted">
          Đầu mỗi tháng, chúng tôi gửi bạn sản phẩm mới, câu chuyện của tháng trước và
          tổng số tiền đã đóng góp cho cộng đồng.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {done ? (
          <motion.p 
            key="done"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="newsletter__done"
          >
            🌿 Cảm ơn bạn! Hẹn gặp lại trong thư đầu tháng tới.
          </motion.p>
        ) : (
          <motion.form 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            className="newsletter__form" 
            onSubmit={submit}
          >
            <input
              className="input interactive"
              type="email"
              required
              minLength={5}
              placeholder="email@cua-ban.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email của bạn"
              style={{ borderRadius: 'var(--radius-pill)', padding: '0.85rem 1.5rem' }}
            />
            <button className="btn btn--accent interactive" type="submit" style={{ padding: '0.85rem 1.8rem' }}>Đăng ký</button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
