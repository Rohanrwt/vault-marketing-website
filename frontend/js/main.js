/* ============================================================
   Vault Marketing — main.js
   ============================================================ */

const FORMSPREE_ID = 'xzdaqglb';

// ── NAV SCROLL ──
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ── HAMBURGER ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function closeMenu() {
  if (!hamburger || !mobileMenu) return;
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.classList.toggle('open', isOpen);
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

// ── SMOOTH SCROLL (no hash in URL) ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', window.location.pathname);
    closeMenu();
  });
});

// ── SCROLL REVEAL ──
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── FAQ ACCORDION ──
document.querySelectorAll('.faq__btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq__item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq__item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ── YEAR ──
const yrEl = document.getElementById('yr');
if (yrEl) yrEl.textContent = new Date().getFullYear();

// ── FORMSPREE SUBMIT ──
async function submitToFormspree(data) {
  const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Submission failed');
}

document.querySelectorAll('form[data-formspree]').forEach(form => {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const successEl = form.nextElementSibling;
    const originalText = btn.textContent;

    btn.disabled = true;
    btn.textContent = 'Sending…';

    const data = Object.fromEntries(new FormData(form));
    data._subject = form.dataset.subject || 'New inquiry — Vault Marketing';

    try {
      await submitToFormspree(data);
      form.style.display = 'none';
      if (successEl && successEl.classList.contains('form-success')) {
        successEl.classList.add('visible');
      }
    } catch {
      btn.disabled = false;
      btn.textContent = originalText;
      const errMsg = document.createElement('p');
      errMsg.style.cssText = 'font-size:0.8rem;color:#888;margin-top:0.5rem;';
      errMsg.textContent = 'Something went wrong. Please try again.';
      btn.after(errMsg);
      setTimeout(() => errMsg.remove(), 4000);
    }
  });
});
