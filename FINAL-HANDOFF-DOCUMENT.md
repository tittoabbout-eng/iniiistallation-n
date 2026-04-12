# Final Handoff Document

This document explains the architecture, content model, and safe workflow for the InsideOut Joinery website.

## Project Architecture

The website is built using React, Vite, Tailwind CSS, and TypeScript. It uses a static-site generation approach where all content is managed via local JSON files and Netlify CMS (Decap CMS).

### Where content lives

All text and page configuration is stored in JSON files under `src/content/`.

- **Global settings:** `src/content/site-settings.json` controls the business name, contact details, operating hours, and the three featured project slugs shown on the homepage.
- **Global copy:** `src/content/global-content.json` controls homepage hero text, CTA labels, and footer copy.
- **Shared sections:** `src/content/homepage-sections.json` controls the before/after teaser and service areas teaser text.
- **Projects:** `src/content/projects/*.json` contains the content, hero image, and gallery arrays for each individual project page.
- **Services:** `src/content/services/*.json` contains the content, hero image, and before/after slider configuration for each service page.

### Where images live

- **CMS uploads:** `public/uploads/` contains images uploaded directly through the CMS interface.
- **Project folders:** `public/<project-slug>/` (e.g., `public/willoughby/`) contains images specifically added for that project.
- **Legacy imports:** `public/legacy-imports/` contains images imported from the old website. These are for review only and are not live.

## Key Features and Controls

### Featured Projects

The homepage displays three featured projects. These are controlled by the `featuredProjectSlugs` array in `src/content/site-settings.json`. The slugs must exactly match the filename (without `.json`) of a project in `src/content/projects/`.

### Before/After Sliders

Service pages (like Kitchens and Wardrobes) feature a before/after slider. This is configured in the service JSON file under the `beforeAfter` block, which requires a `before` image path, an `after` image path, and corresponding alt text.

### Image Galleries

Project pages feature a gallery of finished images (`afterImages`) and construction images (`beforeImages`). The order of these images on the live site exactly matches their order in the JSON array.

## Safe Image Workflow

A comprehensive guide to managing images safely is available in `IMAGE-WORKFLOW-GUIDE.md`. The core principles are:

1. **Adding:** Resize to 1200px (or 1600px for heroes), compress under 400KB (or 500KB for heroes), copy to the relevant `public/` folder, and add the path to the JSON file.
2. **Replacing:** Do not overwrite existing files. Upload the new file with a new name, update the JSON reference, and run checks before deleting the old file.
3. **Removing:** Never delete a file from `public/` before removing its reference from JSON. Remove the JSON reference, run `npm run check:images` to confirm it is unused, and then delete the file.
4. **Reordering:** Change the order of objects in the `afterImages` or `beforeImages` array in the JSON file, or drag them in the CMS.

## Safety Checks and Publishing

Before committing any changes to GitHub (which triggers a Netlify deployment), always run the following safety checks:

```bash
npm run agency:check
```

This single command runs three essential checks:
1. `npm run check:content`: Validates JSON structure, ensures required fields exist, confirms all image paths resolve, and verifies featured slugs.
2. `npm run check:images`: Flags unused images that can be safely deleted and warns about oversized images that need compression.
3. `npm run build`: Confirms the full site compiles and bundles correctly.

If `agency:check` passes without errors, the changes are safe to commit and push. Netlify will automatically build and deploy the site from the `main` branch.

## Current Known Issues

- **Oversized Images:** There are 15 legacy images in the `projects-old/` folder that exceed the recommended 400KB limit. They do not break the site, but compressing them will improve page load speeds.
- **Unused Images:** The `check:images` script flags several unused images in project folders (e.g., `willoughby-mudroom.jpg`). These are safe to delete after confirming their JSON references have been removed.

## Strongest Pages

These pages represent the highest quality of work and photography on the site, featuring premium finishes and multiple styled angles.

1. **Darlinghurst:** Features a premium hero kitchen shot, excellent detail shots, a unique murphy bed feature, and strong before/after contrast.
2. **Willoughby:** Excellent depth and variety. The white shaker island hero is very strong, supported by clean laundry and wardrobe shots.
3. **Beaumont Hills:** The walk-in wardrobe with LED strip lighting and dark timber feature wall is a standout, premium addition.

## Weakest Pages & Photography Priorities

These pages are acceptable for launch but should be prioritized for professional photography updates.

1. **Castle Hill Kitchen & Laundry:** Currently only has 5 images. Needs more styled kitchen angles.
2. **Carlton Kitchen Renovation:** Only has 3 after images. Needs more variety and a dedicated hero shot.
3. **Neutral Bay Home Renovation:** Needs clean, styled finished shots. Available legacy images were too messy or showed mid-construction demolition.

## Launch Status

The InsideOut Joinery website is **READY FOR PUBLISH**.

### Remaining tasks before domain connection/indexing:

1. **Domain Configuration:** Manually configure the custom domain (`insideoutjoinery.com.au` or `insideoutjoinery.au`) in Netlify and update DNS settings.
2. **Form Testing:** Submit a test inquiry through the live Contact page to ensure the form submission is routed to the correct email address.
3. **Final Commit:** Commit and push the final snapshot to the `main` branch to trigger the production deployment.
