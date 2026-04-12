# Image Workflow Guide

This guide covers every image scenario for the InsideOut Joinery website. Read it before adding, removing, replacing, or reorganising any images.

---

## Folder structure overview

| Folder | Purpose |
|---|---|
| `public/uploads/` | CMS-uploaded images. Used for hero and gallery images managed via the CMS. |
| `public/<project-slug>/` | Project-specific image folders, e.g. `public/willoughby/`, `public/darlinghurst/`. Used for images added directly to project JSON files. |
| `public/services/` | Service page support images, e.g. hero replacements or before/after pairs. |
| `public/legacy-imports/` | Images imported from the old website for review only. Not live. Do not reference directly from JSON without copying to a live folder first. |

---

## Image size guidelines

| Use | Recommended width | Target file size |
|---|---|---|
| Hero images (project, service, homepage) | 1600px | Under 500 KB |
| Gallery images (after/before arrays) | 1200px | Under 400 KB |
| Before/after slider images | 1200px | Under 400 KB |
| Service area hero images | 1600px | Under 500 KB |
| Card/thumbnail images | 800px | Under 200 KB |

Run `npm run check:images` after uploading to confirm no oversized images are referenced.

---

## Scenario 1: Adding a new image to a project gallery

1. Prepare the image: resize to 1200px wide, compress to under 400 KB. Use JPEG for photos.
2. Copy the image to the project's public folder, e.g. `public/willoughby/willoughby-new-shot.jpg`.
3. Open `src/content/projects/willoughby.json`.
4. Add a new entry to the `afterImages` array:
   ```json
   {
     "src": "/willoughby/willoughby-new-shot.jpg",
     "alt": "Willoughby kitchen island with stone benchtop and handleless cabinetry"
   }
   ```
5. Position the entry where you want it to appear in the gallery. The first item appears first.
6. Run `npm run check:content` to confirm the path resolves correctly.

---

## Scenario 2: Reordering gallery images

Gallery order is controlled by the order of items in the `afterImages` or `beforeImages` array.

**In the CMS:** Open the project, scroll to the Finished Images section, and drag items up or down using the handle on the left of each row.

**In the JSON file directly:** Open the project JSON file and move the image objects up or down in the array. The first object in the array appears first in the gallery.

After reordering, run `npm run check:content` to confirm nothing was accidentally broken.

---

## Scenario 3: Replacing an existing image

1. Prepare the new image: resize and compress to the recommended size.
2. Copy the new image to the same folder as the existing image, using a new filename.
3. Open the project or service JSON file and update the image path to the new filename.
4. Update the alt text if the new image shows something different.
5. Run `npm run check:content` to confirm the new path resolves.
6. Run `npm run check:images` — the old image will now appear in the unused list.
7. Delete the old image file from `public/` only after confirming it is unused.

**Do not overwrite existing image files.** Always use a new filename for replacements so you can safely roll back if needed.

---

## Scenario 4: Removing an image safely

Removing an image from the live site requires two steps: removing the reference first, then deleting the file.

1. Open the project or service JSON file.
2. Remove or update the entry that references the image.
3. Run `npm run check:content` to confirm no errors.
4. Run `npm run check:images` — the image will now appear in the unused list.
5. Delete the file from `public/` only after it appears in the unused list.

**Never delete an image file before removing its reference from JSON.** This will cause a broken image on the live site.

---

## Scenario 5: Replacing a hero image

1. Prepare the new hero image: resize to 1600px wide, compress to under 500 KB.
2. Copy the new image to the relevant folder, e.g. `public/willoughby/willoughby-hero-new.jpg`.
3. Open the project or service JSON file and update the `heroImage` field to the new path.
4. Update the `heroAlt` field to describe the new image accurately.
5. Run `npm run check:content` to confirm the path resolves.
6. Run `npm run check:images` to confirm the old hero is now flagged as unused.
7. Delete the old hero file only after confirming it is unused.

---

## Scenario 6: Fixing a broken before/after slider

The before/after slider requires two correctly mapped images:

- **Before image:** must show the original room, demolition, or pre-renovation state.
- **After image:** must show the finished, installed joinery result.

If the slider is showing the wrong image on either side:

1. Open the relevant service JSON file, e.g. `src/content/services/kitchens-renovations.json`.
2. Check the `beforeAfter` block:
   ```json
   "beforeAfter": {
     "before": "/willoughby/willoughby-kitchen-before-1.jpg",
     "after": "/willoughby/willoughby-kitchen-detail-2.jpg",
     "beforeAlt": "Kitchen before renovation",
     "afterAlt": "Kitchen after custom joinery fitout"
   }
   ```
3. Confirm `before` points to the actual before image and `after` points to the finished result.
4. If they are swapped, update the paths and alt text to match correctly.
5. Run `npm run check:content` to confirm both paths resolve.

---

## Scenario 7: Using images from legacy-imports

`public/legacy-imports/` contains images imported from the old website for review. They are not live.

To use a legacy image on a live page:

1. Identify the image you want to use in `public/legacy-imports/<folder>/`.
2. Copy (do not move) the image to the correct live folder, e.g. `public/willoughby/`.
3. Rename it to follow the project naming convention, e.g. `willoughby-kitchen-new-angle.jpg`.
4. Add it to the relevant project JSON as described in Scenario 1.
5. Run `npm run check:content` to confirm the path resolves.

Do not reference images directly from `public/legacy-imports/` in JSON files. Always copy them to a live folder first.

---

## Scenario 8: Changing featured projects on the homepage

The three featured projects on the homepage are controlled by `featuredProjectSlugs` in `src/content/site-settings.json`.

1. Open `src/content/site-settings.json` or go to Site Settings in the CMS.
2. Update the `featuredProjectSlugs` array with exactly 3 project slugs in the order you want them to appear:
   ```json
   "featuredProjectSlugs": ["willoughby", "darlinghurst", "epping"]
   ```
3. Each slug must exactly match the `slug` field in a project JSON file. Slugs are case-sensitive.
4. Run `npm run check:content` to confirm all 3 slugs are valid.

---

## Running the safety checks

Always run these before committing or deploying after any image or content change:

```
npm run check:content    # validates JSON, required fields, image paths, and featured slugs
npm run check:images     # flags unused images and oversized referenced images
npm run build            # confirms the full site compiles correctly
```

Run all three together with:

```
npm run agency:check
```

---

## What check:images reports

`npm run check:images` will flag:

| Warning type | What it means | What to do |
|---|---|---|
| Unused image in public/uploads/ | An uploaded image is no longer referenced in any JSON | Safe to delete if confirmed unused |
| Unused image in project folder | A project image is no longer referenced | Remove the JSON reference first, then delete the file |
| Hero/full-width image over 500 KB | A hero image is too large | Compress using Squoosh or similar before deploying |
| Gallery/card image over 400 KB | A gallery image is too large | Compress using Squoosh or similar before deploying |
| Referenced image over 1 MB | A very large image is actively referenced | Compress immediately — this will slow page load significantly |

`public/legacy-imports/` is intentionally excluded from this check.

---

## What check:content reports

`npm run check:content` will flag:

| Error type | What it means | What to do |
|---|---|---|
| Missing required field | A project, service, or area JSON is missing a required field | Open the file and fill in the missing field |
| Missing image | A JSON references an image path that does not exist in public/ | Upload the image to the correct path, or update the JSON reference |
| Duplicate slug | Two files share the same slug | Rename one and update any references to it |
| Invalid featured slug | A slug in featuredProjectSlugs does not match any project | Check the slug spelling and case in site-settings.json |
| Missing gallery alt text | A gallery image entry is missing alt text | Open the project JSON and add descriptive alt text |
| Old domain reference | A file still references insideoutjoinery.com.au | Replace with insideoutjoinery.au |

---

## Naming conventions

- Use lowercase letters and hyphens only in filenames, e.g. `willoughby-kitchen-island.jpg`.
- Prefix project images with the project slug, e.g. `darlinghurst-wardrobe-detail.jpg`.
- Prefix service images with the service slug, e.g. `wardrobes-hero.jpg`.
- Avoid spaces, uppercase letters, and special characters in filenames.
- Use `.jpg` for photos and `.svg` for icons and logos.

---

## Quick reference: where to find things

| Task | Where to go |
|---|---|
| Change homepage hero image | `src/content/global-content.json` → `homepage.heroImage` |
| Change featured projects | `src/content/site-settings.json` → `featuredProjectSlugs` |
| Add/remove project gallery images | `src/content/projects/<slug>.json` → `afterImages` or `beforeImages` |
| Fix a before/after slider | `src/content/services/<slug>.json` → `beforeAfter` |
| Change a service hero image | `src/content/services/<slug>.json` → `heroImage` |
| Change a project hero image | `src/content/projects/<slug>.json` → `heroImage` |
| Review legacy images | `public/legacy-imports/<folder>/` |
| Upload new images via CMS | CMS → Media → Upload |
