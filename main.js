/* ============================================================
   Vault Marketing — main.js
   ============================================================
   SETUP REQUIRED (one-time):
   1. Go to https://formspree.io → create a free account
   2. Create a new form → copy your Form ID (e.g. "xpzgwqkl")
   3. Replace BOTH occurrences of 'YOUR_FORMSPREE_ID' below
   ============================================================ */

const FORMSPREE_ID = 'xzdaqglb'; // ✅ Your Formspree Form ID

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function closeMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeMenu(); closeModal(); } });

// ── CUSTOM CURSOR (desktop only) ──
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

  // SCALABILITY FIX: Pause RAF when tab is hidden → saves CPU
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
    } else {
      rafId = requestAnimationFrame(animateFollower);
    }
  });

  document.querySelectorAll('a, button, .service-card, .result-card, .industry-card, .process-step, .tcard').forEach(el => {
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
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── SCROLL REVEAL ──
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

// ── MARQUEE: DYNAMIC SPEED based on item count ──
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  const itemCount = marqueeTrack.querySelectorAll('.marquee-item').length;
  // Half the items because they're duplicated for seamless loop
  const speed = (itemCount / 2) * 2.8;
  marqueeTrack.style.setProperty('--marquee-speed', speed + 's');
  document.querySelector('.marquee-wrap') &&
    document.querySelector('.marquee-wrap').style.setProperty('--marquee-speed', speed + 's');
}

// ── MODAL ──
const overlay     = document.getElementById('modalOverlay');
const formView    = document.getElementById('modalFormView');
const successView = document.getElementById('modalSuccessView');

function openModal() {
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('openModal').addEventListener('click', openModal);
document.getElementById('modalClose').addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

// ── VALIDATION HELPERS ──
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s\-()]{7,15}$/;

function markError(el, msg) {
  el.classList.add('error');
  const errEl = el.nextElementSibling;
  if (errEl && errEl.classList.contains('form-error-msg')) errEl.textContent = msg;
}
function clearError(el) {
  el.classList.remove('error');
}

// ── MODAL FORM SUBMIT → Formspree ──
document.getElementById('formSubmit').addEventListener('click', async () => {
  const nameEl  = document.getElementById('leadName');
  const phoneEl = document.getElementById('leadPhone');
  const emailEl = document.getElementById('leadEmail');
  const hpEl    = document.getElementById('hp_website'); // Honeypot

  // Bot protection: if honeypot is filled, silently bail
  if (hpEl && hpEl.value) return;

  let valid = true;
  [nameEl, phoneEl, emailEl].forEach(el => clearError(el));

  if (!nameEl.value.trim()) {
    markError(nameEl, 'Please enter your full name.'); valid = false;
  }
  if (!PHONE_RE.test(phoneEl.value.trim())) {
    markError(phoneEl, 'Please enter a valid phone number.'); valid = false;
  }
  if (!EMAIL_RE.test(emailEl.value.trim())) {
    markError(emailEl, 'Please enter a valid email address.'); valid = false;
  }
  if (!valid) return;

  const btn = document.getElementById('formSubmit');
  btn.disabled = true;
  btn.textContent = 'Sending…';

  try {
    if (FORMSPREE_ID === 'YOUR_FORMSPREE_ID') {
      // Dev mode: simulate success when Formspree isn't set up
      console.info('[DEV] Lead captured (set FORMSPREE_ID to send for real):', {
        name:  nameEl.value.trim(),
        phone: phoneEl.value.trim(),
        email: emailEl.value.trim(),
        source: 'Modal – Case Study Download'
      });
      showModalSuccess();
    } else {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:      nameEl.value.trim(),
          phone:     phoneEl.value.trim(),
          email:     emailEl.value.trim(),
          _subject:  'New Lead — Case Study Download',
          source:    'Modal – Case Study Download'
        })
      });
      if (res.ok) {
        showModalSuccess();
      } else {
        throw new Error('Submission failed');
      }
    }
  } catch {
    btn.disabled = false;
    btn.textContent = '⚠ Error — please try again';
    setTimeout(() => { btn.textContent = 'Download Case Study  ↓'; }, 3000);
  }
});

function showModalSuccess() {
  formView.style.display = 'none';
  successView.style.display = 'flex';
}

// ── CTA PHONE FORM → Formspree ──
document.getElementById('ctaSubmit').addEventListener('click', async () => {
  const input  = document.getElementById('ctaPhone');
  const note   = document.getElementById('ctaNote');
  const hpCta  = document.getElementById('hp_cta'); // Honeypot

  // Bot check
  if (hpCta && hpCta.value) return;

  const phone = input.value.trim();
  if (!PHONE_RE.test(phone)) {
    input.style.borderColor = 'var(--accent)';
    input.placeholder = 'Please enter a valid WhatsApp number';
    return;
  }

  const btn = document.getElementById('ctaSubmit');
  btn.disabled = true;
  btn.textContent = 'Sending…';

  try {
    if (FORMSPREE_ID === 'YOUR_FORMSPREE_ID') {
      console.info('[DEV] CTA Lead (set FORMSPREE_ID to send for real):', phone);
      showCtaSuccess(input, note, btn);
    } else {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          _subject: 'New Lead — Website CTA',
          source:   'CTA Section – Strategy Call'
        })
      });
      if (res.ok) {
        showCtaSuccess(input, note, btn);
      } else {
        throw new Error('Submission failed');
      }
    }
  } catch {
    btn.disabled = false;
    btn.textContent = 'Get Free Call →';
    note.textContent = '⚠ Something went wrong. Please try again.';
    note.style.color = '#e52222';
  }
});

function showCtaSuccess(input, note, btn) {
  input.value = '';
  input.placeholder = "✓ Got it! We'll call you within 24 hours.";
  input.style.borderColor = '#10B981';
  note.textContent = '🎉 Expect a call from us very soon!';
  note.style.color = '#10B981';
  btn.textContent = '✓ Sent!';
}
