# Vault Marketing — Website

## Quick Start: Open Locally
Just open `index.html` in your browser, or run a local server:
```
npx serve .
```
Then visit `http://localhost:3000`

---

## ⚡ SETUP CHECKLIST (Do Before Going Live)

### 1. Wire Up Lead Forms (CRITICAL)
1. Go to [formspree.io](https://formspree.io) → Sign up free
2. Create a new form → Copy the Form ID (e.g. `xpzgwqkl`)
3. Open `main.js` → Line 9
4. Replace `YOUR_FORMSPREE_ID` with your ID:
   ```js
   const FORMSPREE_ID = 'xpzgwqkl'; // your actual ID
   ```
5. Test: submit the form → leads will appear in your Formspree dashboard AND email

### 2. Add Your Case Study PDF
- Put your PDF file at: `case-studies.pdf` (same folder as index.html)
- The download link in the modal will automatically work

### 3. Add Analytics
- **Google Analytics 4**: Create a property at [analytics.google.com](https://analytics.google.com)
  - Copy Measurement ID (e.g. `G-XXXXXXXXXX`)
  - In `index.html`, uncomment the GA4 block and replace the ID
- **Meta Pixel**: Get your Pixel ID from [Meta Events Manager](https://business.facebook.com/events_manager)
  - In `index.html`, uncomment the Meta Pixel block and replace the ID

### 4. Update Domain References
In `index.html`, update these to your real domain:
- `og:url` → your live URL
- `og:image` → your hosted OG image (1200×630px recommended)
- `link rel="canonical"` → your live URL

In `sitemap.xml`, replace `vaultmarketing.in` with your real domain.

### 5. Deploy to CDN (Free)
**Recommended: Cloudflare Pages** (handles any traffic spike from Meta Ads)
1. Push this folder to a GitHub repo
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
3. Connect the repo → Deploy
4. Set your custom domain → Done

Alternatively: **Vercel** or **Netlify** both work identically.

---

## File Structure
```
/
├── index.html         — Main landing page
├── style.css          — All styles (cached separately)
├── main.js            — All JS (cached separately)
├── privacy.html       — Privacy policy (DPDP Act compliant)
├── case-studies.pdf   — ⚠ ADD THIS: your case study PDF
├── robots.txt         — Search engine crawler rules
├── sitemap.xml        — Sitemap for Google indexing
└── README.md          — This file
```

---

## What Was Fixed (March 2026 Audit)
- ✅ Lead forms now send to Formspree (real data capture)
- ✅ Input validation: email regex + phone regex
- ✅ Honeypot bot protection on both forms
- ✅ Content-Security-Policy meta tag
- ✅ Privacy policy page (India DPDP Act 2023 compliant)
- ✅ GA4 + Meta Pixel stubs (just uncomment + add your IDs)
- ✅ Meta description + Open Graph/Twitter Card tags
- ✅ 3 testimonials (was 1)
- ✅ Mobile: process step descriptions now visible
- ✅ Focus-visible styles for keyboard accessibility
- ✅ Copyright year is now dynamic
- ✅ Muted text contrast fixed (WCAG AA compliant)
- ✅ CSS/JS separated into files (browser caching)
- ✅ Google Fonts preconnect (faster load)
- ✅ noscript fallback for reveal animations
- ✅ RAF cursor loop paused when tab is hidden (saves CPU)
- ✅ Dynamic marquee speed
- ✅ robots.txt + sitemap.xml
- ✅ Aria labels for accessibility
