import re

with open('src/components.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# find where .donate__opts { starts (around line 1195)
idx = -1
for i, line in enumerate(lines):
    if '.donate__opts {' in line:
        idx = i
        break

if idx != -1:
    lines = lines[:idx]
    
rest = '''
.donate__opts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 0.8rem;
}
.donate__opts .pill {
  padding: clamp(0.2rem, 2vw, 0.6rem) clamp(0.2rem, 3vw, 1rem);
  font-size: clamp(0.7rem, 3vw, 0.95rem);
  border-radius: var(--radius-lg);
  background: #fff;
  border: 1px solid rgba(46, 107, 79, 0.15);
  font-weight: 600;
  min-width: 0;
  max-width: 100%;
  flex: 1 1 auto;
  text-align: center;
}
.donate__opts .pill:hover {
  background: var(--sand-100);
}
.donate__opts .pill.is-active {
  background: var(--clay-500);
  color: #fff;
  border-color: var(--clay-500);
}
.donate__custom {
  width: 100%;
  min-width: 0;
  border-radius: var(--radius-lg);
  border: 1px dashed var(--clay-400);
  background: #fff;
  font-size: 1.05rem;
  padding: 0.8rem 1rem;
}
.donate__custom:focus {
  border-style: solid;
}
.summary__rows {
  margin: 0 0 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}
.summary__rows > div {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.2rem;
}
.summary__rows dt,
.summary__rows dd {
  margin: 0;
}
.summary__total {
  border-top: 1px solid var(--border);
  padding-top: 0.8rem;
  font-family: var(--serif);
  font-size: 1.25rem;
  color: var(--green-700);
}
.summary__total dt {
  font-weight: 600;
}
.summary__note {
  font-size: 0.8rem;
  text-align: center;
  margin-top: 0.8rem;
}
.cart__summary .btn--ghost {
  margin-top: 0.6rem;
}
@media (max-width: 820px) {
  .cart {
    grid-template-columns: 1fr;
  }
  .cart__summary {
    position: static;
  }
}

/* ---------- Empty / confirm ---------- */
.empty,
.confirm {
  text-align: center;
  max-width: 540px;
  margin-inline: auto;
  padding: clamp(2rem, 5vw, 3.5rem);
}
.empty__emoji,
.confirm__emoji {
  font-size: 3.5rem;
  display: block;
  margin-bottom: 1rem;
}
.empty h1,
.confirm h1 {
  margin-bottom: 0.8rem;
}
.empty .btn,
.confirm .btn {
  margin-top: 1.5rem;
}
.confirm__cta {
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* ---------- Auth ---------- */
.authwrap {
  display: grid;
  place-items: center;
}
.auth {
  width: 100%;
  max-width: 440px;
  padding: clamp(1.8rem, 4vw, 2.6rem);
  text-align: center;
}
.auth__mark {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 0.5rem;
}
.auth h1 {
  font-size: 1.8rem;
  margin-bottom: 0.6rem;
}
.auth > .muted {
  margin-bottom: 1.6rem;
}
.google {
  border: 1px solid var(--border-strong);
  gap: 0.6rem;
}
.auth__divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.4rem 0;
  color: var(--text-soft);
  font-size: 0.85rem;
}
.auth__divider::before,
.auth__divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}
.auth__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
}
.auth__form .btn {
  margin-top: 0.4rem;
}
.auth__note {
  font-size: 0.8rem;
  margin-top: 1.2rem;
}

/* ---------- Account ---------- */
.account__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.6rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.account__id {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.account__avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--green-500), var(--green-700));
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 1.6rem;
  font-weight: 700;
  flex-shrink: 0;
}
.account__id h1 {
  font-size: 1.6rem;
}
.account__stats {
  margin-bottom: 1.5rem;
}
.astat {
  padding: 1.3rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.astat strong {
  font-family: var(--serif);
  font-size: 1.6rem;
  color: var(--green-700);
}
.astat--badge strong {
  font-size: 1.3rem;
}
.account__impact {
  padding: 1.2rem 1.5rem;
  background: var(--clay-100);
  border: 1px solid var(--clay-100);
  margin-bottom: 2rem;
  font-size: 1.02rem;
  color: var(--clay-600);
}
.account__impact strong {
  color: var(--clay-600);
}
.account__grid {
  display: grid;
  grid-template-columns: 1.7fr 1fr;
  gap: 2rem;
  align-items: start;
}
.account__orders h2,
.account__badges h2 {
  margin-bottom: 1rem;
}
.orders {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.order {
  padding: 1.3rem;
}
.order__head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
}
.order__items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.order__items li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.95rem;
}
.order__donate {
  color: var(--clay-600);
}
.order__foot {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--border);
  margin-top: 0.8rem;
  padding-top: 0.8rem;
}
.order__foot strong {
  color: var(--green-700);
}
.badges {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.badge {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.2rem;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--surface);
  opacity: 0.55;
}
.badge.is-unlocked {
  opacity: 1;
  border-color: var(--green-200);
  background: var(--green-50);
}
.badge__emoji {
  font-size: 1.8rem;
}
.badge div {
  display: flex;
  flex-direction: column;
}
.badge span {
  font-size: 0.82rem;
}
@media (max-width: 820px) {
  .account__grid {
    grid-template-columns: 1fr;
  }
}

/* Google Sign-In button responsive override */
.cart__summary .interactive,
.cart__summary .interactive > div,
.cart__summary .interactive iframe,
.cart__summary .interactive [role="button"] {
  max-width: 100% !important;
  min-width: 0 !important;
  height: auto !important;
  min-height: 40px !important;
}
.cart__summary .interactive span {
  white-space: normal !important;
  word-break: break-word !important;
  line-height: 1.2 !important;
}
'''
    
    with open('src/components.css', 'w', encoding='utf-8') as f:
        f.writelines(lines)
        f.write(rest.lstrip())
