# Priority Backlog & AI Prompt Pack

This document outlines the remaining tasks for the InsideOut Joinery website, categorized by urgency, and provides a prompt pack for future AI assistance.

## Priority Backlog

The following tasks are prioritized to ensure a smooth launch and continuous improvement.

### Must Fix Before Publish

- **Domain connection:** Ensure the custom domain (insideoutjoinery.com.au or insideoutjoinery.au) is correctly configured in Netlify and DNS settings.
- **Form testing:** Submit a test inquiry through the Contact page and confirm it is received correctly via Netlify Forms or the configured email routing.
- **Final image compression:** Review the `check:images` warnings and compress the 15 flagged oversized images in the `projects-old/` folders to under 400KB to ensure optimal page load speed.

### Good After Launch

- **Google Analytics 4 (GA4):** Verify that the tracking hooks implemented in Batch 2 are successfully recording events in the GA4 dashboard.
- **SEO meta tags:** Review the generated `public/robots.txt` and `public/sitemap.xml` to ensure all pages are indexable and correctly structured for search engines.
- **Content expansion:** Add more detailed descriptions to the individual project pages, expanding beyond the basic overview to include specific materials used and challenges overcome.

### Future Improvements

- **CMS user roles:** Configure Decap CMS to support different user roles (e.g., Editor, Admin) if multiple team members will be managing content.
- **Dynamic image sizing:** Implement a responsive image solution (e.g., Vite plugin or Netlify Image CDN) to automatically serve appropriately sized images based on the user's device screen width.
- **Client testimonials:** Integrate a dedicated testimonials section or page, pulling reviews from Google Business Profile or a custom CMS collection.

### Photography Priorities

The visual QA pass identified the following projects as lacking premium, styled photography. These should be prioritized for future professional photoshoots.

- **Castle Hill Kitchen & Laundry:** Currently only has 5 images, and the laundry shots are from a cluttered angle. Needs more styled kitchen angles.
- **Carlton Kitchen Renovation:** Only has 3 after images. Needs more variety and a dedicated hero shot.
- **Neutral Bay Home Renovation:** The legacy images available were too messy (lived-in, items on counters) or showed mid-construction demolition. Needs clean, styled finished shots.

---

## AI Prompt Pack

This section provides ready-to-use prompts for instructing another AI agent to continue managing and improving the website safely.

### Prompt 1: Adding a new project

> "I have a new project to add to the InsideOut Joinery website. The project is a kitchen renovation in [Suburb Name]. I have [Number] finished photos and [Number] before photos. Please create a new project JSON file in `src/content/projects/`, name it `[suburb]-kitchen-renovation.json`, and populate it using the `project-template.json`. Guide me through uploading the images, adding them to the JSON file, and running the `agency:check` safety scripts before committing."

### Prompt 2: Replacing a hero image

> "I want to replace the hero image on the [Page Name] page. I have a new image named `[new-image-name].jpg` that is 1600px wide and under 500KB. Please instruct me on where to upload it, exactly which JSON file and field to update, and how to safely remove the old hero image using the `check:images` script to confirm it is no longer referenced."

### Prompt 3: Compressing oversized images

> "The `npm run check:images` script has flagged several oversized images in the `projects-old/` folder. Please write a Python script using the PIL library to automatically resize these specific images to a maximum width of 1200px and compress them to under 400KB, replacing the original files. After running the script, please run `check:images` again to confirm the warnings are resolved."

### Prompt 4: Updating homepage featured projects

> "I want to change the three featured projects displayed on the homepage. The new featured projects should be [Project Slug 1], [Project Slug 2], and [Project Slug 3]. Please update the `featuredProjectSlugs` array in `src/content/site-settings.json`, and then run `npm run check:content` to verify that all three slugs are valid and resolve correctly."
