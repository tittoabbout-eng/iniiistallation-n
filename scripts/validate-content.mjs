import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const contentRoot = path.join(projectRoot, 'src', 'content');
const publicRoot = path.join(projectRoot, 'public');
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif', '.avif']);
const preferredDomain = 'https://insideoutjoinery.au';
const disallowedDomain = 'https://insideoutjoinery.com.au';

const errors = [];
const warnings = [];
const slugMaps = {
  projects: new Map(),
  services: new Map(),
  areas: new Map(),
};

const requiredByFolder = {
  projects: ['slug', 'title', 'summary', 'heroImage', 'heroAlt'],
  services: ['slug', 'title', 'metaTitle', 'metaDescription', 'heroImage', 'heroAlt'],
  areas: ['slug', 'name', 'region', 'metaTitle', 'metaDescription', 'heroImage', 'heroAlt'],
};

// Required fields for nested gallery image objects
const requiredImageFields = ['src', 'alt'];

function walk(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walk(full));
    else results.push(full);
  }
  return results;
}

function isImagePath(value) {
  if (typeof value !== 'string') return false;
  const clean = value.split('?')[0].split('#')[0];
  return clean.startsWith('/') && imageExtensions.has(path.extname(clean).toLowerCase());
}

function checkImagePath(filePath, value, fieldHint) {
  const cleaned = value.split('?')[0].split('#')[0];
  const target = path.join(publicRoot, cleaned.replace(/^\//, ''));
  if (!fs.existsSync(target)) {
    const hint = fieldHint ? ` (field: ${fieldHint})` : '';
    errors.push(
      `${relative(filePath)}${hint} references missing image: ${value}\n` +
      `  → Fix: upload the image to public/ at that path, or update the JSON to point to the correct file.\n` +
      `  → If the image is in public/legacy-imports/, copy it to the correct live folder first.`
    );
  }
}

function relative(filePath) {
  return path.relative(projectRoot, filePath).replace(/\\/g, '/');
}

function traverseValue(filePath, value, fieldKey) {
  if (Array.isArray(value)) {
    value.forEach((item) => traverseValue(filePath, item, fieldKey));
    return;
  }
  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([k, v]) => traverseValue(filePath, v, k));
    return;
  }
  if (isImagePath(value)) checkImagePath(filePath, value, fieldKey);
}

// Validate that gallery image objects have required fields (src + alt)
function validateGalleryImages(filePath, images, galleryName) {
  if (!Array.isArray(images)) return;
  images.forEach((image, index) => {
    if (!image || typeof image !== 'object') return;
    for (const field of requiredImageFields) {
      if (!image[field] || (typeof image[field] === 'string' && !image[field].trim())) {
        errors.push(
          `${relative(filePath)} ${galleryName}[${index}] is missing required field: "${field}"\n` +
          `  → Fix: open this project in the CMS or JSON editor and add the missing ${field === 'src' ? 'image path' : 'alt text'}.`
        );
      }
    }
    // Warn if alt text looks like a placeholder or is very short
    if (image.alt && typeof image.alt === 'string' && image.alt.trim().length < 10) {
      warnings.push(
        `${relative(filePath)} ${galleryName}[${index}] has very short alt text: "${image.alt}" — consider making it more descriptive for SEO and accessibility`
      );
    }
  });
}

// Validate space-by-space sections have required fields
function validateSpaces(filePath, spaces) {
  if (!Array.isArray(spaces)) return;
  spaces.forEach((space, index) => {
    if (!space || typeof space !== 'object') return;
    const required = ['title', 'text', 'image', 'alt', 'servicePath'];
    for (const field of required) {
      if (!space[field] || (typeof space[field] === 'string' && !space[field].trim())) {
        errors.push(
          `${relative(filePath)} spaces[${index}] is missing required field: "${field}"\n` +
          `  → Fix: open this project in the CMS or JSON editor and fill in the missing ${field} for the space-by-space section.`
        );
      }
    }
  });
}

for (const filePath of walk(contentRoot).filter((file) => file.endsWith('.json'))) {
  const raw = fs.readFileSync(filePath, 'utf8');
  let json;
  try {
    json = JSON.parse(raw);
  } catch (error) {
    errors.push(
      `${relative(filePath)} is not valid JSON: ${error.message}\n` +
      `  → Fix: open the file in a JSON validator (e.g. jsonlint.com) and correct the syntax error before deploying.`
    );
    continue;
  }

  const folder = path.basename(path.dirname(filePath));
  const skipImageValidation = folder === 'templates';
  if (!skipImageValidation) {
    traverseValue(filePath, json, null);
  }

  if (requiredByFolder[folder]) {
    for (const key of requiredByFolder[folder]) {
      if (!json[key] || (typeof json[key] === 'string' && !json[key].trim())) {
        errors.push(
          `${relative(filePath)} is missing required field: "${key}"\n` +
          `  → Fix: open this file in the CMS or JSON editor and fill in the "${key}" field.`
        );
      }
    }

    if (json.slug) {
      const seen = slugMaps[folder];
      if (seen.has(json.slug)) {
        errors.push(
          `${relative(filePath)} duplicates slug "${json.slug}" — also used in ${seen.get(json.slug)}\n` +
          `  → Fix: each entry must have a unique slug. Rename one of them and update any references.`
        );
      } else {
        seen.set(json.slug, relative(filePath));
      }
    }
  }

  // Validate gallery image objects in project files
  if (folder === 'projects' && !skipImageValidation) {
    validateGalleryImages(filePath, json.afterImages, 'afterImages');
    validateGalleryImages(filePath, json.beforeImages, 'beforeImages');
    validateSpaces(filePath, json.spaces);
  }

  if (json.slug && path.basename(filePath, '.json') !== json.slug && folder !== 'templates') {
    warnings.push(
      `${relative(filePath)} file name does not match slug "${json.slug}"\n` +
      `  → Note: the slug field and filename should match. If you renamed the file, update the slug field too.`
    );
  }
}

const regionGroupsPath = path.join(contentRoot, 'region-groups.json');
if (fs.existsSync(regionGroupsPath)) {
  const regionGroups = JSON.parse(fs.readFileSync(regionGroupsPath, 'utf8'));
  const areaSlugs = new Set(Array.from(slugMaps.areas.keys()));
  for (const group of regionGroups) {
    for (const suburb of group.suburbs || []) {
      if (!areaSlugs.has(suburb.slug)) {
        warnings.push(
          `src/content/region-groups.json references missing area slug: "${suburb.slug}"\n` +
          `  → Note: create a matching area file at src/content/areas/${suburb.slug}.json, or remove this entry from region-groups.json.`
        );
      }
    }
  }
}

// Validate featured project slugs in site-settings.json
const siteSettingsPath = path.join(contentRoot, 'site-settings.json');
if (fs.existsSync(siteSettingsPath)) {
  const siteSettings = JSON.parse(fs.readFileSync(siteSettingsPath, 'utf8'));
  if (Array.isArray(siteSettings.featuredProjectSlugs)) {
    const projectSlugs = new Set(Array.from(slugMaps.projects.keys()));
    for (const slug of siteSettings.featuredProjectSlugs) {
      if (!projectSlugs.has(slug)) {
        errors.push(
          `src/content/site-settings.json featuredProjectSlugs references unknown project slug: "${slug}"\n` +
          `  → Fix: check that "${slug}" exactly matches the slug field in a file under src/content/projects/. Slugs are case-sensitive.`
        );
      }
    }
    if (siteSettings.featuredProjectSlugs.length !== 3) {
      warnings.push(
        `src/content/site-settings.json featuredProjectSlugs has ${siteSettings.featuredProjectSlugs.length} item(s) — expected exactly 3 for the homepage featured section\n` +
        `  → Fix: edit Site Settings in the CMS and ensure exactly 3 project slugs are listed.`
      );
    }
  }
}

// Validate related project slugs in service files
for (const [slug, filePath] of Object.entries(
  Object.fromEntries(
    walk(path.join(contentRoot, 'services'))
      .filter((f) => f.endsWith('.json'))
      .map((f) => [f, f])
  )
)) {
  const json = JSON.parse(fs.readFileSync(slug, 'utf8'));
  if (Array.isArray(json.projectSlugs)) {
    const projectSlugs = new Set(Array.from(slugMaps.projects.keys()));
    for (const projectSlug of json.projectSlugs) {
      if (!projectSlugs.has(projectSlug)) {
        warnings.push(
          `${relative(slug)} projectSlugs references unknown project slug: "${projectSlug}"\n` +
          `  → Note: check that "${projectSlug}" exactly matches a slug in src/content/projects/. This may cause a missing related project on the service page.`
        );
      }
    }
  }
}

const publicFilesToCheck = [
  path.join(projectRoot, 'index.html'),
  path.join(publicRoot, 'robots.txt'),
  path.join(publicRoot, 'sitemap.xml'),
  path.join(publicRoot, 'admin', 'config.yml'),
];

for (const filePath of publicFilesToCheck) {
  if (!fs.existsSync(filePath)) continue;
  const raw = fs.readFileSync(filePath, 'utf8');
  if (raw.includes(disallowedDomain)) {
    errors.push(
      `${relative(filePath)} still references old domain ${disallowedDomain}\n` +
      `  → Fix: replace all occurrences of ${disallowedDomain} with ${preferredDomain} in this file.`
    );
  }
  if ((filePath.endsWith('robots.txt') || filePath.endsWith('sitemap.xml')) && !raw.includes(preferredDomain)) {
    warnings.push(`${relative(filePath)} does not reference preferred domain ${preferredDomain}`);
  }
}

if (errors.length === 0 && warnings.length === 0) {
  console.log('Content check passed: JSON is valid, required fields exist, image paths resolve, and featured slugs are valid.');
  process.exit(0);
}

if (warnings.length > 0) {
  console.log(`${warnings.length} warning(s):`);
  for (const message of warnings) console.log(`\nWarning: ${message}`);
}
if (errors.length > 0) {
  console.log(`\n${errors.length} error(s) — fix these before deploying:`);
  for (const message of errors) console.error(`\nError: ${message}`);
}
process.exit(errors.length ? 1 : 0);
