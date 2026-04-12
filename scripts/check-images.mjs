import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const publicRoot = path.join(projectRoot, 'public');
const contentRoot = path.join(projectRoot, 'src', 'content');
const imageExts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg']);
const ignoredPaths = new Set(['/favicon.svg', '/favicon-32x32.png', '/apple-touch-icon.png', '/og-insideoutjoinery-au.jpg']);

// Folders that are intentionally kept outside the live image set and should never be flagged as unused
const ignoredFolderPrefixes = ['/legacy-imports/', '/uploads/README'];

const warnings = [];
const referenced = new Set();

// Size thresholds
const HERO_SIZE_WARN_KB = 500;   // Hero/full-width images: warn above 500 KB
const GALLERY_SIZE_WARN_KB = 400; // Gallery/card images: warn above 400 KB
const HARD_LIMIT_KB = 1024;       // Hard limit: always warn above 1 MB

function walk(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walk(full));
    else results.push(full);
  }
  return results;
}

// Collect all image paths referenced in content JSON files
function maybeCollect(value) {
  if (Array.isArray(value)) return value.forEach(maybeCollect);
  if (value && typeof value === 'object') return Object.values(value).forEach(maybeCollect);
  if (typeof value !== 'string') return;
  const clean = value.split('?')[0].split('#')[0];
  if (!clean.startsWith('/')) return;
  const ext = path.extname(clean).toLowerCase();
  if (!imageExts.has(ext)) return;
  referenced.add(clean);
}

// Collect hero image paths specifically for higher threshold
const heroImages = new Set();
function collectHeroImages(json) {
  if (!json || typeof json !== 'object') return;
  for (const key of ['heroImage', 'beforeImage', 'afterImage', 'before', 'after']) {
    if (typeof json[key] === 'string' && json[key].startsWith('/')) {
      heroImages.add(json[key]);
    }
  }
  // Recurse into nested objects (e.g. beforeAfter section)
  for (const value of Object.values(json)) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      collectHeroImages(value);
    }
  }
}

for (const filePath of walk(contentRoot).filter((file) => file.endsWith('.json'))) {
  const folder = path.basename(path.dirname(filePath));
  if (folder === 'templates') continue;
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  maybeCollect(json);
  collectHeroImages(json);
}

const imageFiles = walk(publicRoot).filter((file) => imageExts.has(path.extname(file).toLowerCase()));
for (const filePath of imageFiles) {
  const rel = '/' + path.relative(publicRoot, filePath).replace(/\\/g, '/');
  const stats = fs.statSync(filePath);
  const sizeKB = Math.round(stats.size / 1024);
  const ext = path.extname(filePath).toLowerCase();

  // Skip admin assets and intentionally isolated folders (legacy-imports, README files)
  if (rel.startsWith('/admin/')) continue;
  if (ignoredFolderPrefixes.some((prefix) => rel.startsWith(prefix) || rel === prefix.replace(/\/$/, ''))) continue;

  if (!referenced.has(rel) && !ignoredPaths.has(rel)) {
    // Distinguish between uploads (safe to delete) and project subfolders (careful)
    if (rel.startsWith('/uploads/')) {
      warnings.push(`Unused image in public/uploads/: ${rel} (${sizeKB} KB) — safe to delete if no longer needed`);
    } else {
      warnings.push(`Unused image in project folder: ${rel} (${sizeKB} KB) — check JSON before deleting (may be referenced by a page not yet deployed)`);
    }
  }

  if (referenced.has(rel)) {
    if (stats.size > HARD_LIMIT_KB * 1024) {
      warnings.push(`Referenced image over 1 MB: ${rel} (${sizeKB} KB) — compress before deploy`);
    } else if ((ext === '.jpg' || ext === '.jpeg' || ext === '.png') && heroImages.has(rel) && sizeKB > HERO_SIZE_WARN_KB) {
      warnings.push(`Hero/full-width image over ${HERO_SIZE_WARN_KB} KB: ${rel} (${sizeKB} KB) — consider compressing to under ${HERO_SIZE_WARN_KB} KB`);
    } else if ((ext === '.jpg' || ext === '.jpeg' || ext === '.png') && !heroImages.has(rel) && sizeKB > GALLERY_SIZE_WARN_KB) {
      warnings.push(`Gallery/card image over ${GALLERY_SIZE_WARN_KB} KB: ${rel} (${sizeKB} KB) — consider compressing to under ${GALLERY_SIZE_WARN_KB} KB`);
    }
  }
}

// Summary counts
const unusedUploadsCount = warnings.filter((w) => w.startsWith('Unused image in public/uploads/')).length;
const unusedProjectCount = warnings.filter((w) => w.startsWith('Unused image in project folder:')).length;
const oversizedCount = warnings.filter((w) => !w.startsWith('Unused')).length;

if (warnings.length === 0) {
  console.log('Image check passed: no oversized referenced images and no unused public images found.');
  console.log('Note: public/legacy-imports/ is intentionally excluded from this check.');
  process.exit(0);
}

console.log(`Image check complete: ${unusedUploadsCount} unused upload(s), ${unusedProjectCount} unused project image(s), ${oversizedCount} oversized image(s).`);
console.log('');
console.log('Safe deletion guide:');
console.log('  public/uploads/ images flagged as unused: safe to delete after confirming they are not referenced anywhere.');
console.log('  Project subfolder images flagged as unused: remove the reference from the JSON first, run check:content, then delete the file.');
console.log('  public/legacy-imports/ images: intentionally kept for review — do not delete without approval.');
console.log('');
for (const warning of warnings) console.log(`Warning: ${warning}`);
process.exit(0);
