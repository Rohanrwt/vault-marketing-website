/* ============================================================
   Vault Marketing — main.js
   ============================================================ */

const FORMSPREE_ID = 'xzdaqglb'; // ✅ Your Formspree Form ID

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function closeMenu() {
  if (hamburger) hamburger.classList.remove('open');
  if (mobileMenu) mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

document.addEventListener('keydown', e => { 
  if (e.key === 'Escape') { 
    closeMenu(); 
    const overlay = document.getElementById('modalOverlay');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  } 
});

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href').slice(1);
    if (!targetId) return;
    const target = document.getElementById(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', window.location.pathname);
  });
});

// ── CUSTOM CURSOR ──
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('follower');

if (cursor && follower) {
  let mx = 0, my = 0, fx = 0, fy = 0;
  let rafId = null;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = (mx - 5) + 'px';
    cursor.style.top  = (my - 5) + 'px';
  });

  function animateFollower() {
    fx += (mx - fx - 18) * 0.12;
    fy += (my - fy - 18) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    rafId = requestAnimationFrame(animateFollower);
  }
  rafId = requestAnimationFrame(animateFollower);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(rafId);
    else rafId = requestAnimationFrame(animateFollower);
  });

  document.querySelectorAll('a, button, .service-card, .result-card, .industry-card, .process-step, .tcard, .pricing-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(3)';
      follower.style.transform = 'scale(0.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      follower.style.transform = 'scale(1)';
    });
  });
}

// ── NAV SCROLL ──
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ── SCROLL REVEAL ──
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

// ── MARQUEE ──
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  const itemCount = marqueeTrack.querySelectorAll('.marquee-item').length;
  const speed = (itemCount / 2) * 2.8;
  marqueeTrack.style.setProperty('--marquee-speed', speed + 's');
  const wrap = document.querySelector('.marquee-wrap');
  if (wrap) wrap.style.setProperty('--marquee-speed', speed + 's');
}

// ── MODAL ──
const overlay = document.getElementById('modalOverlay');
const openModalBtn = document.getElementById('openModal');
const modalCloseBtn = document.getElementById('modalClose');

if (overlay && modalCloseBtn) {
  const formView = document.getElementById('modalFormView');
  const successView = document.getElementById('modalSuccessView');

  function openModal() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (openModalBtn) openModalBtn.addEventListener('click', openModal);
  modalCloseBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

  // ── FORM SUBMIT ──
  const formSubmitBtn = document.getElementById('formSubmit');
  if (formSubmitBtn) {
    formSubmitBtn.addEventListener('click', async () => {
      const nameEl = document.getElementById('leadName');
      const phoneEl = document.getElementById('leadPhone');
      const emailEl = document.getElementById('leadEmail');
      const hpEl = document.getElementById('hp_website');

      if (hpEl && hpEl.value) return;

      const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      const PHONE_RE = /^\+?[\d\s\-()]{7,15}$/;

      let valid = true;
      [nameEl, phoneEl, emailEl].forEach(el => el.classList.remove('error'));

      if (!nameEl.value.trim()) { nameEl.classList.add('error'); valid = false; }
      if (!PHONE_RE.test(phoneEl.value.trim())) { phoneEl.classList.add('error'); valid = false; }
      if (!EMAIL_RE.test(emailEl.value.trim())) { emailEl.classList.add('error'); valid = false; }
      if (!valid) return;

      formSubmitBtn.disabled = true;
      formSubmitBtn.textContent = 'Sending…';

      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: nameEl.value.trim(),
            phone: phoneEl.value.trim(),
            email: emailEl.value.trim(),
            source: 'Modal Case Study'
          })
        });
        if (res.ok) {
          if (formView) formView.style.display = 'none';
          if (successView) successView.style.display = 'flex';
        } else throw new Error();
      } catch {
        formSubmitBtn.disabled = false;
        formSubmitBtn.textContent = 'Error - Try Again';
      }
    });
  }
}

// ── CTA SUBMIT ──
const ctaSubmitBtn = document.getElementById('ctaSubmit');
if (ctaSubmitBtn) {
  ctaSubmitBtn.addEventListener('click', async () => {
    const input = document.getElementById('ctaPhone');
    const note = document.getElementById('ctaNote');
    const phone = input.value.trim();
    const PHONE_RE = /^\+?[\d\s\-()]{7,15}$/;

    if (!PHONE_RE.test(phone)) {
      input.style.borderColor = 'red';
      return;
    }

    ctaSubmitBtn.disabled = true;
    ctaSubmitBtn.textContent = 'Sending…';

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, source: 'CTA Section' })
      });
      if (res.ok) {
        input.value = '';
        input.placeholder = "✓ Sent!";
        if (note) note.textContent = '🎉 We\'ll call you soon!';
      } else throw new Error();
    } catch {
      ctaSubmitBtn.disabled = false;
      ctaSubmitBtn.textContent = 'Error';
    }
  });
}
