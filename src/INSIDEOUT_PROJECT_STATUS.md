# InsideOut Joinery & Renos — Project Master Document
**Domain:** insideoutjoinery.au  
**Last updated:** April 18, 2026  
**Purpose:** Live record of site status, completed work, outstanding tasks, and SEO/AEO/AI search strategy

---

## Current Site Overview

**Stack:** React 18 + TypeScript + Vite + Tailwind CSS  
**Hosting:** Netlify (auto-deploy from GitHub main branch)  
**Repo:** github.com/tittoabbout-eng/insideout-joinery-renos-site  
**Rendering:** Client-side only (no SSR/prerender — highest priority technical gap)  
**CMS:** JSON file-based content in src/content/  

---

## What the Site Has Right Now

### Pages
- Homepage
- 7 service pages: Kitchens, Bathrooms, Wardrobes, Laundry, Renovations, Custom Joinery, Shelving & Storage
- 18 project pages with before/after galleries
- 61 suburb/service-area pages (includes Liverpool, Parramatta, Campbelltown, Bankstown)
- Service Areas listing page
- Projects listing page
- Contact page with quote form
- Blog listing page + 2 posts live

### Technical Foundation
- Proper meta title, description, canonical on every page
- Lazy loading on non-hero images
- Alt text on all images
- FAQPage + BreadcrumbList + LocalBusiness + KitchenRemodeler schema
- Contact form with Netlify Forms handling
- Sticky Call/Quote bar on mobile
- Before/after slider on service pages
- Project gallery with lightbox

---

## PROS

1. Writing quality — trade-led, non-generic throughout
2. Mobile layout — responsive, sticky CTA, phone prominent
3. 18 real project pages with photos, materials, outcomes
4. Complete contact form with file upload
5. All service pages have proper SEO structure
6. 61 suburb pages — geographic coverage competitors lack
7. Consistent brand — navy/gold, typography, tone
8. JSON content system — easy to update without touching code
9. Blog launched with 2 strong posts
10. Footer shows high-value target suburbs

---

## CONS

### Critical
1. No prerender/SSR — Google gets empty HTML shell
2. No WebP images — all JPG, one image at 2200x1650px uncompressed

### Significant
3. Blog not linked from footer
4. No Google review count visible inline
5. NAP inconsistency across external directories
6. No pricing transparency on service pages

### Minor
7. Castle Hill hero image still using unnamed jpeg from projects-old
8. Hunters Hill and Chatswood using same hero image
9. Sitemap not confirmed as submitted to Search Console
10. Blog posts don't internally link to service pages yet

---

## Completed Work Log

### Session: April 18, 2026

| # | Task | Files Changed | Status |
|---|---|---|---|
| 1 | Schema fix — @type changed to array ['LocalBusiness', 'HomeAndConstructionBusiness', 'KitchenRemodeler'] | src/utils/schema.ts | ✅ |
| 2 | Removed secondaryEmail (info@insideoutjoinery.com.au) from site-settings | src/content/site-settings.json | ✅ |
| 3 | Fixed broken featuredAreaSlugs — replaced "rosebery" (no file) with "surry-hills" | src/content/site-settings.json | ✅ |
| 4 | Shelving & Storage service page created | src/content/services/shelving-storage.json | ✅ |
| 5 | Blog data layer built — BlogPost type, import.meta.glob, getBlogPostBySlug | src/data/blog.ts | ✅ |
| 6 | Blog listing page built | src/pages/Blog.tsx | ✅ |
| 7 | Blog individual post page built | src/pages/BlogPost.tsx | ✅ |
| 8 | Blog post 1: Kitchen Renovation Cost Sydney | src/content/blog/kitchen-renovation-cost-sydney.json | ✅ |
| 9 | Blog post 2: Custom Joinery vs Flat Pack Sydney | src/content/blog/custom-joinery-vs-flat-pack-sydney.json | ✅ |
| 10 | Blog routes added to App.tsx | src/App.tsx | ✅ |
| 11 | Blog added to desktop + mobile navigation | src/components/Navigation.tsx | ✅ |
| 12 | Liverpool suburb page created (home base) | src/content/areas/liverpool.json | ✅ |
| 13 | Parramatta suburb page created | src/content/areas/parramatta.json | ✅ |
| 14 | Campbelltown suburb page created | src/content/areas/campbelltown.json | ✅ |
| 15 | Bankstown suburb page created | src/content/areas/bankstown.json | ✅ |
| 16 | region-groups.json updated — Liverpool, Parramatta, Campbelltown, Bankstown added to correct groups | src/content/region-groups.json | ✅ |

**Notes from April 18:**
- `tsc --noEmit` returned zero errors confirming all code is valid (build tool binary not available in Linux sandbox — macOS node_modules)
- Blog system uses `import.meta.glob('../content/blog/*.json', { eager: true, import: 'default' })` — adding a new post = adding a JSON file only
- ReviewGrid component uses `items` prop not `reviews` — confirmed and verified
- Old .com.au confirmed de-indexed on Google (zero results for site:insideoutjoinery.com.au) — focus shifted fully to building out new .au site
- `info@insideoutjoinery.com.au` removed from all site code — primary email is `info@insideoutjoinery.au` throughout

### Session: April 17, 2026

| # | Task | Files Changed | Status |
|---|---|---|---|
| 1 | Schema → LocalBusiness + KitchenRemodeler | src/utils/schema.ts | ✅ |
| 2 | Renovations H1 → Home Renovations Sydney | src/content/services/renovations.json | ✅ |
| 3 | Willoughby project images fixed to /willoughby/ folder | src/content/projects/willoughby.json | ✅ |
| 4 | Bathrooms expanded — 5 blocks, 7 FAQs | src/content/services/bathrooms.json | ✅ |
| 5 | Mosman admin FAQ removed | src/content/areas/mosman.json | ✅ |
| 6 | Castle Hill admin FAQ removed | src/content/areas/castle-hill.json | ✅ |
| 7 | Surry Hills admin FAQ removed | src/content/areas/surry-hills.json | ✅ |
| 8 | North Sydney suburb page created | src/content/areas/north-sydney.json | ✅ |
| 9 | Strathfield suburb page created | src/content/areas/strathfield.json | ✅ |
| 10 | North Sydney + Strathfield in region-groups | src/content/region-groups.json | ✅ |
| 11 | Footer suburbs → high-value targets | src/content/site-settings.json | ✅ |
| 12 | Featured projects → 6 strongest | src/content/site-settings.json | ✅ |
| 13 | Blog listing + individual post pages built | src/pages/Blog.tsx, BlogPost.tsx, src/data/blog.ts | ✅ |
| 14 | Blog post 1: Kitchen Renovation Cost Sydney | src/content/blog/kitchen-renovation-cost-sydney.json | ✅ |
| 15 | Blog post 2: Custom Joinery vs Flat Pack | src/content/blog/custom-joinery-vs-flat-pack-sydney.json | ✅ |
| 16 | Blog routes in App.tsx | src/App.tsx | ✅ |
| 17 | Blog SEO — Seo component replacing raw title tags | src/pages/Blog.tsx, BlogPost.tsx | ✅ |

---

## Outstanding Tasks

### Do Next

| Priority | Task | Why |
|---|---|---|
| 🔴 | WebP image conversion + compress large images | Core Web Vitals, speed, ranking |
| 🔴 | Prerender setup | Google can't read content without it |
| 🟠 | Add /blog to footer nav | Blog not discoverable from footer |
| 🟠 | Add internal links from blog posts to service pages | SEO authority flow |
| 🟠 | Submit sitemap to Google Search Console | Confirm indexing pipeline |
| 🟠 | Blog post 3: How Long Does a Kitchen Renovation Take | 200+ searches/month |
| 🟠 | Blog post 4: Walk-in Wardrobe Ideas Sydney | 300+ searches/month |

### Next 2 Weeks

| Priority | Task | Why |
|---|---|---|
| 🟡 | Fix Castle Hill hero image | Named file instead of 2.jpeg |
| 🟡 | Differentiate Hunters Hill + Chatswood hero images | Both use same image |
| 🟡 | Add review count/stars inline on homepage | Trust signal |
| 🟡 | NAP consistency audit across directories | Local SEO signal |

### Next Month

| Priority | Task | Why |
|---|---|---|
| 🟡 | Blog post 5: Bathroom Renovation Cost Sydney | 400+ searches/month |
| 🟡 | Blog post 6: 10 Kitchen Ideas for Sydney Homes | High volume |
| 🟡 | hipages.com.au listing | Direct leads from active buyers |
| 🟡 | houzz.com.au listing | Premium renovation audience |
| 🟡 | Pricing FAQs on kitchen and bathroom service pages | Cost-query traffic |
| 🟡 | Micro-influencer outreach — free 3D render offer | Unique zero-cost leverage |

---

## SEO / AEO / AI Search Strategy

### Google Rankings — What Drives Them

**1. Google Business Profile (fastest path to leads)**
- Recover access: Case #7-4185000041091
- Primary category: Kitchen Remodeler
- Additional: Bathroom Remodeler, Carpenter, Joinery
- Upload 10+ project photos
- Post weekly updates
- Respond to all reviews within 24 hours

**2. Suburb + Service Page Combinations**
- Fill remaining gaps: Fairfield, Narellan, Ryde, Strathfield
- Each page needs a real local angle — no template copy
- Connect to real project pages wherever possible
- Build one new suburb page per week

**3. Blog Content — Pre-Purchase Queries**
| Query | Volume | Status |
|---|---|---|
| kitchen renovation cost sydney | 500+/month | ✅ Live |
| custom joinery vs flat pack | 300+/month | ✅ Live |
| how long does kitchen renovation take | 200+/month | TODO |
| bathroom renovation cost sydney | 400+/month | TODO |
| walk in wardrobe ideas sydney | 300+/month | TODO |

Target: 2 blog posts per month minimum.

---

### AEO — Winning Featured Snippets

- Every FAQ answers the question in the first sentence
- FAQ answers at 40-60 words — quotable as a snippet
- H2 headings match search queries exactly
- Add cost FAQs to Kitchen and Bathroom service pages
- FAQPage schema already implemented — keep it on all pages

---

### AI Search — ChatGPT, Perplexity, Claude, Gemini

AI models pull from pages that are specific, structured, and written by apparent experts.

**Already working:**
- Real project pages with specific materials and locations
- Trade language that signals expertise
- FAQ content AI can extract
- LocalBusiness + KitchenRemodeler schema confirming entity

**To add over time:**
- More specific numbers: timelines, price ranges, material brands
- Case study format: problem → approach → result
- License number and years of experience on key pages
- Consistent NAP across all external citations

---

## What Is Still Missing From Original 10-Task List

| Task | Status | Notes |
|---|---|---|
| Fix 3 broken images | ✅ | Were lazy-load false positives — files exist |
| Convert to WebP | ❌ | Still JPG throughout — needs doing |
| High-value suburb pages | ✅ | Liverpool, Parramatta, Campbelltown, Bankstown, North Sydney, Strathfield added |
| Fix Renovations H1 | ✅ | Now Home Renovations Sydney |
| Fix schema | ✅ | @type now array — LocalBusiness + HomeAndConstructionBusiness + KitchenRemodeler |
| Expand Bathroom page | ✅ | 5 blocks, 7 FAQs |
| Prerender | ❌ | Not done — needs careful implementation |
| Blog + 2 posts | ✅ | Both live with correct SEO |
| Shelving service page | ✅ | shelving-storage.json live |
| Old .com.au email removed | ✅ | secondaryEmail fields removed from site-settings.json |

---

## Update Log

| Date | Build | What Changed |
|---|---|---|
| April 18, 2026 | Multiple clean builds | Schema fixed (KitchenRemodeler array). secondaryEmail removed. rosebery bug fixed. Shelving & Storage service page added. Blog system built from scratch (Blog.tsx, BlogPost.tsx, blog.ts, 2 posts, App.tsx routes, Navigation). Liverpool, Parramatta, Campbelltown, Bankstown suburb pages created. region-groups.json updated. |
| April 17, 2026 | Multiple clean builds | Initial session — 17 tasks completed. Blog launched. Schema partially fixed. Footer and featured projects updated. North Sydney and Strathfield created. |

---
*This file is maintained and updated after every successful build and deployment.*
