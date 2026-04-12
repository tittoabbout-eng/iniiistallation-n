# Deploy checklist

## Before every live push
- [ ] Run `npm run check:content`
- [ ] Run `npm run check:images`
- [ ] Run `npm run dev`
- [ ] Check homepage, one service page, one project page and one suburb page
- [ ] Check new images load correctly
- [ ] Run `npm run build`

## For GitHub + Netlify
- [ ] Push the latest source to GitHub
- [ ] Confirm Netlify build passes
- [ ] Confirm the preview/live Netlify URL looks right
- [ ] Only then connect or update the real domain


SEO & asset generation
- `npm run generate:seo` refreshes `public/robots.txt`, `public/sitemap.xml` and `src/content/image-dimensions.json` from the live content.
- `npm run dev` and `npm run build` now run this automatically first.
