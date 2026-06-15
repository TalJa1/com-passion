import { useState } from 'react';

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

      {done ? (
        <p className="newsletter__done">🌿 Cảm ơn bạn! Hẹn gặp lại trong thư đầu tháng tới.</p>
      ) : (
        <form className="newsletter__form" onSubmit={submit}>
          <input
            className="input"
            type="email"
            required
            placeholder="email@cua-ban.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email của bạn"
          />
          <button className="btn btn--accent" type="submit">Đăng ký</button>
        </form>
      )}
    </div>
  );
}
