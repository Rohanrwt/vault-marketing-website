# Vault Marketing — SEO Foundation Build Brief

You are Claude Code working on vaultmarketing.in, a Next.js + React application. Your job is to audit the existing codebase and build a complete SEO foundation. Follow this brief step by step. Pause for approval at each major checkpoint.

---

## OPERATING RULES (read first, follow always)

1. **Audit before building.** Never write code in the first response.
2. **Detect, don't assume.** Check whether this is App Router or Pages Router. Check Tailwind/shadcn/CSS-modules. Check TypeScript vs JavaScript. Adapt all code to match.
3. **Small batches.** Build 3–5 files, then stop and summarize. Wait for me to say "continue" before the next batch.
4. **Never delete existing pages or components without explicit approval.**
5. **Never install dependencies without asking first.** If you need a package, propose it, explain why, and wait.
6. **Match existing code style.** Use the same import patterns, component structure, naming conventions already in the repo.
7. **Every file change must include:** file path, the change (or full new file), and a 1-line "why".
8. **If you're unsure, ask.** Better to ask one question than build the wrong thing.

---

## BUSINESS CONTEXT

- **Brand:** Vault Marketing (vaultmarketing.in)
- **Founder:** Rohan, based in Dehradun, India
- **Targeting:** Canada (Calgary primarily), India (boutique resort vertical)
- **Tagline:** "We get service businesses more clients"
- **Services:** Website + SEO + Google Ads + AI Search Rankings + Meta Ads
- **Two verticals:**
  1. **Auto detailing businesses in Canada** — flagship case study: Glam Detailing, Calgary, ranked #1 on Gemini AI for ceramic coating searches
  2. **Boutique resorts in India** — flagship case study: NAQSH Resort, 32x ROAS via Meta Ads, direct booking system
- **Tone of voice:**
  - Direct, confident, founder-led
  - Short punchy sentences. No corporate fluff.
  - Real numbers, never vague claims
  - First-person plural ("we built", "we ran", "we got") for case studies
  - Conversational but never casual to the point of unprofessional
- **Visual style (already established on Instagram):**
  - Bold sans-serif typography
  - Dark backgrounds (#0A0A0A, #111)
  - Accent colors: orange (#FF6B1A), yellow (#FFC700), red (#FF3B30), green for callouts
  - Brutalist/editorial feel
  - Heavy use of large hero text

---

## STEP 1 — AUDIT (do this first, no code yet)

Before writing anything, produce an audit report covering:

1. **Stack detection:**
   - Next.js version
   - App Router or Pages Router
   - TypeScript or JavaScript
   - Styling: Tailwind / CSS Modules / styled-components / other
   - Component library: shadcn/ui / Radix / Headless UI / custom / none
   - Package manager: npm / pnpm / yarn / bun

2. **Existing structure:**
   - List all routes/pages currently in the app
   - List all reusable components
   - List the file structure of the `app/` or `pages/` directory
   - Identify the main layout file(s)

3. **Existing SEO state:**
   - Is there a `sitemap.ts` / `sitemap.xml` / `next-sitemap` setup?
   - Is there a `robots.ts` / `robots.txt`?
   - Is `metadata` exported on pages? (App Router) Or `<Head>` used? (Pages Router)
   - Any existing JSON-LD schema?
   - Any analytics scripts present?

4. **Content audit:**
   - What pages currently exist?
   - What's the homepage structure?
   - Are there any service pages, case studies, or blog setup already?

5. **Dependencies check:**
   - Is `next-seo` installed? If not, propose either using native Next.js metadata (preferred for App Router) or installing `next-seo`.
   - Any markdown/MDX setup for blog?

**Output format for Step 1:** A markdown report under 400 words. Then ask: "Approve to proceed to Step 2?" and stop.

---

## STEP 2 — INFORMATION ARCHITECTURE

Once Step 1 is approved, propose the full route structure based on what already exists. Don't build yet — propose.

Target structure:

```
/
/services
  /services/meta-ads-for-detailers
  /services/seo-for-service-businesses
  /services/ai-search-optimization
  /services/google-ads-management
  /services/website-development
/case-studies
  /case-studies/glam-detailing
  /case-studies/naqsh-resort
/blog
  /blog/how-to-rank-on-gemini-ai-for-local-business
  /blog/meta-ads-for-auto-detailers-canada
  /blog/why-your-resort-gets-zero-roi-on-instagram
  /blog/ai-search-optimization-vs-traditional-seo
/about
/contact
/sitemap.xml (auto-generated)
/robots.txt (auto-generated)
```

Show me the proposed file structure mapped to the detected router (App Router → `app/` folder; Pages Router → `pages/` folder). Wait for approval.

---

## STEP 3 — TECHNICAL SEO INFRASTRUCTURE

Build these in this order, pausing after each batch:

### Batch 3A — Core SEO setup
1. **`lib/seo.ts`** — A reusable SEO config helper that returns Next.js Metadata objects. Should accept: `title`, `description`, `path`, `ogImage`, `keywords`, `noindex`. Returns full Metadata with Open Graph + Twitter Card.
2. **`app/sitemap.ts`** (or pages equivalent) — Dynamic sitemap that pulls all routes including blog posts and case studies.
3. **`app/robots.ts`** — Allow all crawlers, point to sitemap, disallow `/api/`.
4. **Root `layout.tsx` / `_app.tsx`** — Default metadata, viewport, theme color, favicon links.

### Batch 3B — Schema markup utilities
1. **`components/seo/JsonLd.tsx`** — A component that takes a schema object and renders it as `<script type="application/ld+json">`.
2. **`lib/schemas.ts`** — Helper functions returning structured data:
   - `organizationSchema()` — Vault Marketing org details, logo, sameAs (Instagram, LinkedIn), contact
   - `localBusinessSchema()` — Dehradun base, service areas (India + Canada)
   - `serviceSchema(service)` — Per-service page
   - `articleSchema(post)` — Per-blog-post
   - `caseStudySchema(study)` — Per-case-study (uses Article + Review schema)
   - `faqSchema(faqs)` — FAQPage schema
   - `breadcrumbSchema(items)` — BreadcrumbList schema
   - `websiteSchema()` — WebSite schema with SearchAction (sitelinks search box)

### Batch 3C — Components
1. **`components/Breadcrumbs.tsx`** — Visual breadcrumbs that also emit BreadcrumbList JSON-LD.
2. **`components/seo/PageSEO.tsx`** — Wrapper that combines metadata + schema in one place per page.
3. **`components/CTASection.tsx`** — Reusable final-CTA block (used at bottom of every service/case study/blog page).
4. **`components/FAQ.tsx`** — Accordion FAQ component that also emits FAQPage schema.

After each batch, summarize files created and ask "continue?".

---

## STEP 4 — SERVICE PAGES

Build all five service pages. Each must include:

- **Metadata:** Unique title (≤60 chars), description (≤155 chars), canonical URL
- **Schema:** Service + Breadcrumb + FAQPage
- **Structure:**
  - H1 with primary keyword
  - Hero: outcome-led headline + subhead + single CTA button
  - "The problem" section (2–3 short paragraphs)
  - "What we do" section (4–6 bullets or feature cards)
  - "Why us" section (3 differentiators)
  - Mini case study callout (link to full case study)
  - 5-question FAQ section
  - Final CTA section
- **Word count:** 1,200–1,800 words
- **Internal links:** Min 3 contextual links to related case studies and other services
- **Tone:** Match the established voice — direct, founder-led, real numbers

### Service page targets (keyword → page):

| Page | Primary Keyword | Secondary Keywords |
|------|-----------------|-------------------|
| /services/meta-ads-for-detailers | meta ads for auto detailers | facebook ads for car detailing, instagram ads for detailing business |
| /services/seo-for-service-businesses | seo for service businesses | local seo for service business, seo for small business canada |
| /services/ai-search-optimization | ai search optimization | gemini ai ranking, chatgpt seo, generative engine optimization |
| /services/google-ads-management | google ads for service businesses | google ads management agency, ppc for service businesses |
| /services/website-development | website development for service businesses | conversion-focused website design, websites that book clients |

Build pages one at a time. Show me each page's full content before committing. After each page, ask "approve and continue to next?"

---

## STEP 5 — CASE STUDY PAGES

### Glam Detailing case study (`/case-studies/glam-detailing`)

Sections:
1. **Hero:** "How we got Glam Detailing ranked #1 on Gemini AI in 90 days"
2. **Client snapshot:** Mobile detailer, Calgary, ceramic coating + paint correction, premium positioning
3. **The challenge:** New brand, no online presence, competing with 6+ established Calgary detailers with 5+ years of SEO
4. **The strategy:** AI search optimization + technical SEO + content velocity + structured data
5. **Execution (step by step):** What we actually did — 6 to 8 specific tactics
6. **Results:** Use placeholders for real numbers I'll fill in (#1 Gemini AI ranking, X% traffic increase, X new bookings, etc.)
7. **Client quote:** Placeholder block — I'll insert real quote
8. **What this means for you:** Direct CTA section for other detailers

### NAQSH Resort case study (`/case-studies/naqsh-resort`)

Sections:
1. **Hero:** "32x ROAS: How we filled NAQSH Resort's weekends with direct bookings"
2. **Client snapshot:** Boutique resort, Rishikesh, 12 rooms, premium positioning, 80% OTA dependency
3. **The challenge:** Margins crushed by OTA commissions, weekend dependency on third-party platforms
4. **The strategy:** Direct booking website + Meta Ads funnel + WhatsApp automation
5. **Execution:** 6–8 specific tactics
6. **Results:** 32x ROAS, 1000+ direct bookings, 100% weekend occupancy, ₹2L/year savings on commissions (use these numbers, mark any unverified ones with `[VERIFY]`)
7. **Client quote:** Placeholder
8. **What this means for you:** CTA for other resort owners

Mark all unverified numbers with `[VERIFY: ...]` so I can swap in real data.

For both: include image placeholder components like `<CaseStudyImage src="/case-studies/glam-detailing/hero.jpg" alt="..." caption="..." />` so I know exactly where to drop screenshots later.

---

## STEP 6 — BLOG INFRASTRUCTURE + 4 STARTER POSTS

### Blog setup
- Use **MDX** for blog posts (propose installing `@next/mdx` and `gray-matter` if not present — wait for approval)
- Posts live in `content/blog/*.mdx` with frontmatter: `title, description, date, author, tags, ogImage, slug`
- Build `/blog` hub page with:
  - Hero: "Real playbooks for service business growth"
  - Filter chips by tag: SEO, Meta Ads, AI Search, Case Studies, Detailing, Hospitality
  - Card grid of posts (image, tag, title, excerpt, read time)
- Build `/blog/[slug]` template with:
  - Article header (title, date, author, read time, tags)
  - MDX content rendering
  - Author bio block
  - Related posts (3 cards)
  - Final CTA
  - Article schema

### The 4 starter posts (1,500+ words each)

Don't write generic AI slop. Write in Rohan's voice — short sentences, real numbers, opinions.

1. **`how-to-rank-on-gemini-ai-for-local-business.mdx`**
   - Hook: "While everyone's still optimizing for Google, your customers are asking Gemini. Here's how we ranked #1."
   - Cover: what AI search is, why it matters in 2026, the exact playbook used for Glam Detailing
   - Include: structured data examples, content patterns AI engines reward, citation building, FAQ patterns

2. **`meta-ads-for-auto-detailers-canada.mdx`**
   - Hook: "We've audited 200+ detailing ads in the Meta Ads Library. 90% of them are setting money on fire."
   - Cover: what's wrong with most detailing ads, the 3-tier funnel structure, budget benchmarks (CAD $1,500–2,500/mo), CPL targets ($15–30 CAD), creative angles that actually work
   - Reference Calgary market specifics

3. **`why-your-resort-gets-zero-roi-on-instagram.mdx`**
   - Hook: "Beautiful photos. Zero bookings. Sound familiar?"
   - Cover: why pretty content doesn't book rooms, the direct booking strategy, OTA dependency math, the WhatsApp + landing page combo

4. **`ai-search-optimization-vs-traditional-seo.mdx`**
   - Hook: "Your customers stopped Googling. They're asking AI instead. Is your business showing up?"
   - Cover: how ChatGPT/Gemini/Perplexity differ from Google, what they reward, how to optimize for both, the 5 mistakes service businesses make

Each post must:
- Use proper H2/H3 hierarchy
- Include 2–3 internal links to relevant service/case-study pages
- Include Article schema
- Have a custom OG image placeholder

Build the blog infrastructure first, then the 4 posts one at a time. Pause after each.

---

## STEP 7 — PERFORMANCE & CORE WEB VITALS

1. Audit current state: run `next build` and report bundle sizes per route
2. Image optimization:
   - Ensure all images use `next/image`
   - Convert any raw `<img>` tags
   - Add proper `sizes` attributes
   - Use `priority` only on LCP images
3. Font optimization:
   - Use `next/font` for all custom fonts
   - `display: 'swap'`
4. Script optimization:
   - Use `next/script` with appropriate strategies (`afterInteractive`, `lazyOnload`)
5. CSS:
   - Verify Tailwind purging is correct
   - No unused CSS shipping
6. Add `<link rel="preconnect">` for any third-party origins (GA, fonts)
7. Target: Lighthouse 90+ on mobile

After this batch, run a final build and report Lighthouse-style metrics estimate.

---

## STEP 8 — ANALYTICS & TRACKING

Add (with placeholder IDs marked `[ROHAN: REPLACE]`):
1. **Google Analytics 4** — via `next/script`, lazyOnload strategy
2. **Google Search Console** — verification meta tag in root layout
3. **Microsoft Clarity** — for heatmaps + session recordings
4. **Meta Pixel** — for retargeting (Rohan will run his own ads to detailers)
5. Basic **cookie consent banner** — minimal, GDPR-aware (since UK/EU traffic possible). Don't load tracking until consent given.

Create a single `components/Analytics.tsx` that handles all of this conditionally based on consent state.

---

## STEP 9 — FINAL DELIVERABLES

When all steps are complete, generate at the project root:

### `REPORT.md`
- Executive summary of what was built
- Full list of pages created with their target keywords
- Schema types implemented per page
- Lighthouse score estimates
- Performance notes

### `TODO.md`
- Manual tasks Rohan must complete:
  - [ ] Insert real Glam Detailing screenshots in `/public/case-studies/glam-detailing/`
  - [ ] Insert real NAQSH Resort screenshots in `/public/case-studies/naqsh-resort/`
  - [ ] Replace `[VERIFY:]` markers with real numbers
  - [ ] Insert client quotes in case studies
  - [ ] Replace `[ROHAN: REPLACE]` analytics IDs with real ones
  - [ ] Submit sitemap to Google Search Console
  - [ ] Submit sitemap to Bing Webmaster Tools
  - [ ] Set up Clutch.co, DesignRush, GoodFirms, Sortlist, The Manifest profiles
  - [ ] Build backlink list (target: 30 in 90 days)
  - [ ] Create Google Business Profile (Dehradun base, service area: India + Canada)

### `CONTENT-CALENDAR.md`
- Next 8 blog post topics with target keywords, suggested word count, and which service page they should link to. Spread across 60 days.

### `KEYWORD-MAP.md`
- Table mapping every page → primary keyword → secondary keywords → search intent → recommended internal links

---

## START NOW

Begin with Step 1 — Audit only. No code. Report back, then wait for approval.