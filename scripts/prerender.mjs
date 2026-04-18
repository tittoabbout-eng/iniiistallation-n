/**
 * prerender.mjs
 *
 * Runs after `vite build`. For every route in vite.config.ts:
 *   1. Reads the compiled dist/index.html (the shell)
 *   2. Uses the route path to write a real HTML file at the correct path
 *      so Netlify serves it directly without needing JS to render
 *
 * This is a "static snapshot" prerender — it injects the correct
 * meta title, description, canonical and Open Graph tags per route
 * by reading the JSON content files directly, then writes the HTML.
 *
 * Google and other crawlers receive a real, populated HTML page.
 * The React app still hydrates in the browser as normal.
 *
 * Run: node scripts/prerender.mjs
 * (automatically called by npm run build via package.json postbuild)
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const distDir = path.join(root, 'dist')
const contentDir = path.join(root, 'src', 'content')

// ---------------------------------------------------------------------------
// Read content
// ---------------------------------------------------------------------------
const siteSettings = readJson(path.join(contentDir, 'site-settings.json'))
const siteUrl = siteSettings.siteUrl
const siteName = siteSettings.name
const defaultImage = `${siteUrl}/og-insideoutjoinery-au.jpg`

const services = readJsonDir(path.join(contentDir, 'services'))
const areas = readJsonDir(path.join(contentDir, 'areas'))
const projectFiles = readJsonDir(path.join(contentDir, 'projects'))
const blogPosts = readJsonDir(path.join(contentDir, 'blog'))

// ---------------------------------------------------------------------------
// Route → meta resolver
// Returns { title, description, canonical, image }
// ---------------------------------------------------------------------------
function resolveRouteMeta(routePath) {
  const base = siteUrl + (routePath === '/' ? '' : routePath)

  if (routePath === '/') {
    return {
      title: `${siteName} | Custom Joinery & Renovations Sydney`,
      description: `Premium custom joinery and renovation-focused fitouts across Sydney — kitchens, wardrobes, laundries and real project case studies. Liverpool-based, Sydney-wide.`,
      canonical: base,
      image: defaultImage,
    }
  }

  if (routePath === '/projects') {
    return {
      title: `Projects | ${siteName}`,
      description: `Browse our completed joinery and renovation projects across Sydney — kitchens, wardrobes, laundries and full-home fitouts with real before and after photos.`,
      canonical: base,
      image: defaultImage,
    }
  }

  if (routePath === '/service-areas') {
    return {
      title: `Service Areas | ${siteName}`,
      description: `InsideOut Joinery & Renos services Sydney-wide including the Lower North Shore, Eastern Suburbs, Inner West, Hills District and South West Sydney.`,
      canonical: base,
      image: defaultImage,
    }
  }

  if (routePath === '/contact') {
    return {
      title: `Contact | ${siteName}`,
      description: `Get in touch with InsideOut Joinery & Renos. Send us your plans or photos and we will respond with a realistic scope and budget range for your project.`,
      canonical: base,
      image: defaultImage,
    }
  }

  if (routePath === '/blog') {
    return {
      title: `Blog | ${siteName}`,
      description: `Kitchen renovation costs, joinery guides and renovation advice for Sydney homeowners — written by a licensed joinery contractor with 12 years of real project experience.`,
      canonical: base,
      image: defaultImage,
    }
  }

  // Service pages: /kitchens, /wardrobes, etc.
  const serviceSlug = routePath.slice(1)
  const service = services.find((s) => s.slug === serviceSlug)
  if (service) {
    return {
      title: service.metaTitle || `${service.title} | ${siteName}`,
      description: service.metaDescription || '',
      canonical: base,
      image: service.heroImage ? (service.heroImage.startsWith('http') ? service.heroImage : `${siteUrl}${service.heroImage}`) : defaultImage,
    }
  }

  // Project pages: /projects/:slug
  if (routePath.startsWith('/projects/')) {
    const projectSlug = routePath.replace('/projects/', '')
    const project = projectFiles.find((p) => p.slug === projectSlug)
    if (project) {
      return {
        title: `${project.title} | ${siteName}`,
        description: project.summary || `Custom joinery and renovation project in ${project.suburb}, Sydney.`,
        canonical: base,
        image: project.heroImage ? (project.heroImage.startsWith('http') ? project.heroImage : `${siteUrl}${project.heroImage}`) : defaultImage,
      }
    }
  }

  // Area pages: /service-areas/:slug
  if (routePath.startsWith('/service-areas/')) {
    const areaSlug = routePath.replace('/service-areas/', '')
    const area = areas.find((a) => a.slug === areaSlug)
    if (area) {
      return {
        title: area.metaTitle || `${area.name} | ${siteName}`,
        description: area.metaDescription || '',
        canonical: base,
        image: area.heroImage ? (area.heroImage.startsWith('http') ? area.heroImage : `${siteUrl}${area.heroImage}`) : defaultImage,
      }
    }
  }

  // Blog posts: /blog/:slug
  if (routePath.startsWith('/blog/')) {
    const blogSlug = routePath.replace('/blog/', '')
    const post = blogPosts.find((p) => p.slug === blogSlug)
    if (post) {
      return {
        title: post.metaTitle || `${post.title} | ${siteName}`,
        description: post.metaDescription || '',
        canonical: base,
        image: post.heroImage ? (post.heroImage.startsWith('http') ? post.heroImage : `${siteUrl}${post.heroImage}`) : defaultImage,
      }
    }
  }

  // Fallback
  return {
    title: siteName,
    description: `Premium custom joinery and renovations across Sydney.`,
    canonical: base,
    image: defaultImage,
  }
}

// ---------------------------------------------------------------------------
// HTML injection
// Replaces the placeholder meta tags in the built index.html with
// route-specific values so every static file has real, unique meta.
// ---------------------------------------------------------------------------
function injectMeta(htmlTemplate, meta) {
  let html = htmlTemplate

  // Title
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(meta.title)}</title>`,
  )

  // Canonical
  html = html.replace(
    /(<link rel="canonical" href=")[^"]*(")/,
    `$1${meta.canonical}$2`,
  )

  // Meta description
  html = html.replace(
    /(<meta name="description" content=")[^"]*(")/,
    `$1${escapeHtmlAttr(meta.description)}$2`,
  )

  // OG tags
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/,    `$1${escapeHtmlAttr(meta.title)}$2`)
  html = html.replace(/(<meta property="og:description" content=")[^"]*(")/,`$1${escapeHtmlAttr(meta.description)}$2`)
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/,       `$1${meta.canonical}$2`)
  html = html.replace(/(<meta property="og:image" content=")[^"]*(")/,     `$1${meta.image}$2`)

  // Twitter tags
  html = html.replace(/(<meta name="twitter:title" content=")[^"]*(")/,       `$1${escapeHtmlAttr(meta.title)}$2`)
  html = html.replace(/(<meta name="twitter:description" content=")[^"]*(")/,  `$1${escapeHtmlAttr(meta.description)}$2`)
  html = html.replace(/(<meta name="twitter:image" content=")[^"]*(")/,        `$1${meta.image}$2`)

  return html
}

// ---------------------------------------------------------------------------
// Write static HTML files
// ---------------------------------------------------------------------------
function writeRouteFile(routePath, html) {
  if (routePath === '/') {
    // dist/index.html already exists — overwrite it with injected meta
    fs.writeFileSync(path.join(distDir, 'index.html'), html, 'utf8')
    return
  }

  // e.g. /kitchens → dist/kitchens/index.html
  const dir = path.join(distDir, ...routePath.split('/').filter(Boolean))
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8')
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const templatePath = path.join(distDir, 'index.html')
  if (!fs.existsSync(templatePath)) {
    console.error('❌  dist/index.html not found. Run npm run build first.')
    process.exit(1)
  }

  const template = fs.readFileSync(templatePath, 'utf8')

  // Import the route list from vite.config.ts (we'll read it from the
  // exported JS since TS isn't compiled yet at this stage)
  // We inline the route list here to avoid a TS compilation dependency.
  // Keep this in sync with vite.config.ts:prerenderRoutes
  const routes = buildRouteList()

  console.log(`\n🔨  Prerendering ${routes.length} routes...\n`)

  let count = 0
  for (const routePath of routes) {
    const meta = resolveRouteMeta(routePath)
    const html = injectMeta(template, meta)
    writeRouteFile(routePath, html)
    count++
    process.stdout.write(`  ✓  ${routePath}\n`)
  }

  console.log(`\n✅  Prerender complete — ${count} pages written to dist/\n`)
}

function buildRouteList() {
  const serviceRoutes = services.map((s) => `/${s.slug}`)
  const projectRoutes = projectFiles.map((p) => `/projects/${p.slug}`)
  const areaRoutes = areas.map((a) => `/service-areas/${a.slug}`)
  const blogRoutes = blogPosts.map((b) => `/blog/${b.slug}`)

  return [
    '/',
    '/projects',
    '/service-areas',
    '/contact',
    '/blog',
    ...serviceRoutes,
    ...projectRoutes,
    ...areaRoutes,
    ...blogRoutes,
  ]
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function readJsonDir(dir) {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => readJson(path.join(dir, f)))
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function escapeHtmlAttr(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

main().catch((err) => {
  console.error('Prerender failed:', err)
  process.exit(1)
})
