# Edit here first

This file is the starting point for all content and image changes. Read it before touching any files.

---

## Main content files

These files control global settings, homepage copy, and shared page content. Edit them in the CMS or directly in the JSON files listed below.

| File | What it controls |
|---|---|
| `src/content/site-settings.json` | Business name, phone, email, hours, featured project slugs |
| `src/content/global-content.json` | Homepage copy, CTA labels, brand copy, footer |
| `src/content/homepage-sections.json` | Before/after teaser, service areas teaser |
| `src/content/project-content.json` | Shared labels used across all project pages |
| `src/content/service-areas-page.json` | Service areas listing page copy |
| `src/content/not-found-page.json` | 404 page copy |

## Content collections

Each collection is a folder of JSON files. Add new entries by duplicating an existing file or using `npm run create:entry`.

- `src/content/projects/*.json` — individual project pages
- `src/content/services/*.json` — service pages
- `src/content/areas/*.json` — suburb/area pages

---

## Image workflow

### Adding a new image to a project or service page

1. Prepare the image: resize to the recommended width, compress to under 400 KB (hero images under 500 KB).
2. Upload the file to `public/uploads/` or directly to the relevant project subfolder under `public/`, e.g. `public/willoughby/`.
3. Open the project or service JSON file and add the image path, e.g. `/willoughby/new-image.jpg`.
4. Add descriptive alt text alongside the image path.
5. Run `npm run check:content` to confirm the path resolves correctly.
6. Run `npm run check:images` to confirm no broken references.

### Reordering gallery images

Gallery image order is controlled by the order of items in the `afterImages` or `beforeImages` array in each project JSON file.

- In the CMS: drag items up or down using the handle on the left of each row.
- In the JSON file directly: move the object entries up or down in the array. The first item appears first in the gallery.

### Replacing an existing image

1. Upload the new image to `public/uploads/` or the relevant project subfolder.
2. Open the project or service JSON file and update the image path to point to the new file.
3. Run `npm run check:content` to confirm the new path resolves.
4. Run `npm run check:images` to confirm the old path is now unused.
5. Only delete the old file after confirming it is flagged as unused by `check:images`.

### Removing an image safely

Do not delete image files from `public/` before removing their references from JSON. Deleting a referenced image will cause a broken image on the live site.

Safe deletion steps:

1. Open the project or service JSON file and remove or update the image reference.
2. Run `npm run check:content` to confirm no errors.
3. Run `npm run check:images` — the image will now appear in the unused list.
4. Only then delete the file from `public/`.

### Changing a hero image

1. Upload the new hero image to `public/uploads/` or the relevant project subfolder.
2. Open the project or service JSON file and update the `heroImage` field.
3. Update the `heroAlt` field to match the new image.
4. Run `npm run check:content` to confirm the path resolves.
5. Run `npm run check:images` to confirm the old hero is now flagged as unused (if it is no longer referenced anywhere).
6. Delete the old hero file only after confirming it is unused.

### Legacy imports folder

`public/legacy-imports/` contains images imported from the old website for review. These are intentionally kept separate from the live site.

- Do not reference these images directly from project or service JSON files without first copying them to the correct live folder.
- Do not delete files from `public/legacy-imports/` automatically — they are kept for manual review.
- `check:images` intentionally ignores this folder and will not flag its contents as unused.

---

## Featured project slugs

The three projects shown on the homepage are controlled by `featuredProjectSlugs` in `src/content/site-settings.json`.

- Enter exactly 3 slugs, in the order you want them to appear.
- Each slug must exactly match the `slug` field in a project JSON file, e.g. `willoughby`, `darlinghurst`, `epping`.
- Slugs are case-sensitive.
- Run `npm run check:content` after changing these to confirm all slugs are valid.

---

## Safety checks

Always run these before committing or deploying:

```
npm run check:content    # validates JSON, required fields, image paths, and featured slugs
npm run check:images     # flags unused images and oversized referenced images
npm run build            # confirms the full site compiles correctly
```

The `agency:check` script runs all three in sequence:

```
npm run agency:check
```

---

## SEO and asset generation

`npm run generate:seo` refreshes `public/robots.txt`, `public/sitemap.xml`, and `src/content/image-dimensions.json` from the live content. This runs automatically before `npm run dev` and `npm run build`.

---

## For the full image workflow guide

See `IMAGE-WORKFLOW-GUIDE.md` in the project root for a complete step-by-step reference covering all image scenarios.
