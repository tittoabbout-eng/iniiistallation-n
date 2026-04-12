InsideOut Joinery & Renos - Editable Source

This version is cleaned up to be easier to edit in VS Code now and easier to manage online later through Netlify CMS / Decap.

START HERE
1. Open this folder in VS Code.
2. Run: npm install
3. Run: npm run dev
4. Make your changes.
5. Before publishing, run: npm run build

SAFE FILES TO EDIT MOST OF THE TIME
- src/content/site-settings.json
  Business name, phone, email, address, hours, domain, reviews URL

- src/content/global-content.json
  Homepage hero, CTA labels, footer copy, trust bar copy, brand wording

- src/content/homepage-sections.json
  Homepage before/after teaser and service-areas teaser sections

- src/content/project-content.json
  Shared wording used across the projects page and project detail pages

- src/content/service-areas-page.json
  Service areas page SEO, hero copy, FAQ section and CTA copy

- src/content/not-found-page.json
  404 page text and button labels

- src/content/projects/*.json
  Each project has its own file for title, suburb, summary, hero image, materials,
  before images, after images, space-by-space sections, CTA text and review IDs

- src/content/services/*.json
  Each service has its own file for hero text, SEO title/description, included scope,
  before/after section, FAQs and CTA copy

- src/content/areas/*.json
  Each suburb/service area has its own file for local SEO text, FAQs and CTA copy

- src/content/templates/*.json
  Templates you can duplicate when adding a new project, service or suburb page manually in VS Code

- public/
  Static images already used by the site

- public/uploads/
  Best folder for new CMS-managed image uploads

FILES TO AVOID EDITING UNLESS NEEDED
- dist/
  Build output only. Never edit here.

- src/components/
  Layout and reusable UI. Change only if you want design/layout changes.

- src/pages/
  Page layout logic. Change only if you want structure/layout changes.

IMAGE WORKFLOW
1. Put new images in public/uploads/ or in the project folder already being used.
2. Use simple lowercase file names with dashes.
3. Update the matching JSON content file with the new image path.
4. Run npm run dev and check the page.
5. Run npm run build before publishing.

ADDING A NEW PROJECT IN VS CODE
1. Copy src/content/templates/project-template.json
2. Save it inside src/content/projects/ with your new slug as the file name
3. Update all text, image paths and review IDs
4. Run npm run dev and check the new project page

ADDING A NEW SERVICE PAGE
1. Copy src/content/templates/service-template.json
2. Save it inside src/content/services/
3. Update the content and image paths
4. Run npm run dev and check the page

ADDING A NEW SUBURB PAGE
1. Copy src/content/templates/area-template.json
2. Save it inside src/content/areas/
3. Update the content and image paths
4. Add the suburb to src/content/region-groups.json if you want it listed on the service-areas page
5. Run npm run dev and check the page

ONLINE EDITING ON NETLIFY
This package includes a lightweight Decap CMS admin area:
- /admin
- config file: public/admin/config.yml

What it can help with after deployment:
- edit homepage copy online
- edit project pages online
- add project images online
- edit service pages online
- edit service area pages online
- edit SEO titles and descriptions without touching page code
- edit homepage teaser sections, service-area page copy and the 404 page online

TO USE THE NETLIFY ADMIN PANEL
1. Put the source in GitHub
2. Connect GitHub to Netlify
3. Enable Netlify Identity
4. Enable Git Gateway
5. Invite your own email as a user
6. Open /admin and log in

IMPORTANT
- The admin panel edits the JSON content files in the repo. The design/layout stays stable while the content becomes easier to update.
- Existing images can stay in their current folders. For new images, public/uploads is the easiest workflow.
- This version removes duplicate old content files so there is less confusion about what to edit.

HOW THIS HELPS SEO LATER
- project pages are easier to add and keep consistent
- service pages can be expanded without rebuilding layouts
- suburb pages can be added faster for local SEO
- SEO titles and meta descriptions are editable in content files
- image alt text is editable in project, service and area entries
- service-area page copy and homepage teaser sections are now editable too


AGENCY SHORTCUTS
- npm run check:content
- npm run check:images
  Checks JSON validity, required fields and missing image paths before you deploy

- npm run new:project -- my-new-project
  Creates a new project file from the template with the slug filled in

- npm run new:service -- custom-kitchens
  Creates a new service file from the template

- npm run new:area -- bondi-junction
  Creates a new suburb/service area file from the template

- npm run agency:check
  Runs the content check and then the production build

ALWAYS CHECK BEFORE SENDING LIVE
- npm run dev
- npm run build


SEO & asset generation
- `npm run generate:seo` refreshes `public/robots.txt`, `public/sitemap.xml` and `src/content/image-dimensions.json` from the live content.
- `npm run dev` and `npm run build` now run this automatically first.
