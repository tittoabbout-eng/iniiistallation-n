# InsideOut website - agency handoff version

This package is set up to feel more like an agency handoff than a raw developer source folder.

## Edit here first
- `src/content/site-settings.json`
- `src/content/global-content.json`
- `src/content/homepage-sections.json`
- `src/content/project-content.json`
- `src/content/service-areas-page.json`
- `src/content/not-found-page.json`
- `src/content/projects/*.json`
- `src/content/services/*.json`
- `src/content/areas/*.json`
- `public/uploads/`

## Avoid touching unless you want design changes
- `src/components/`
- `src/pages/`
- `dist/`

## Fast workflow
1. Add or update content in `src/content/`
2. Add new images in `public/uploads/`
3. Run `npm run check:content`
4. Run `npm run check:images`
5. Run `npm run dev`
6. Run `npm run build`
7. Push to GitHub so Netlify updates automatically

## One-command content helpers
- `npm run new:project -- my-new-project`
- `npm run new:service -- custom-kitchens`
- `npm run new:area -- bondi-junction`

These commands create a ready-to-edit JSON file from the templates so you do not have to duplicate files manually.

## What makes this the agency version
- content is separated from layout where possible
- image uploads are kept in one simple folder for new media
- templates exist for projects, services and suburb pages
- content and image checkers catch broken image paths, oversized images and missing required fields before build/deploy
- the Netlify admin is included for later browser editing

## Best deployment workflow
- Edit locally in VS Code
- Save the source in GitHub
- Let Netlify publish from GitHub
- Connect the real domain only when the site is polished enough


SEO & asset generation
- `npm run generate:seo` refreshes `public/robots.txt`, `public/sitemap.xml` and `src/content/image-dimensions.json` from the live content.
- `npm run dev` and `npm run build` now run this automatically first.
