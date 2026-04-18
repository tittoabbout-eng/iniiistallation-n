import fs from 'fs'
import path from 'path'
import { execFileSync } from 'child_process'

const root = process.cwd()
const publicDir = path.join(root, 'public')
const contentDir = path.join(root, 'src', 'content')
const siteSettings = JSON.parse(fs.readFileSync(path.join(contentDir, 'site-settings.json'), 'utf8'))
const services = readJsonDir(path.join(contentDir, 'services'))
const areas = readJsonDir(path.join(contentDir, 'areas'))
const projects = readJsonDir(path.join(contentDir, 'projects'))
const blogPosts = readJsonDir(path.join(contentDir, 'blog'))
const imageDimensions = buildImageDimensions(publicDir)

writeFile(path.join(contentDir, 'image-dimensions.json'), `${JSON.stringify(imageDimensions, null, 2)}\n`)
writeFile(path.join(publicDir, 'robots.txt'), buildRobots(siteSettings.siteUrl))
writeFile(path.join(publicDir, 'sitemap.xml'), buildSitemap({ siteUrl: siteSettings.siteUrl, services, areas, projects, blogPosts }))

function readJsonDir(dir) {
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.json'))
    .map((file) => JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8')))
}

function buildImageDimensions(dir) {
  const result = {}
  walk(dir)
    .filter((file) => /\.(png|jpe?g|webp|avif|gif|svg)$/i.test(file))
    .forEach((filePath) => {
      const rel = '/' + path.relative(dir, filePath).replace(/\\/g, '/')
      try {
        if (filePath.toLowerCase().endsWith('.svg')) {
          const svg = fs.readFileSync(filePath, 'utf8')
          const width = Number(svg.match(/width="([0-9.]+)"/)?.[1]) || 512
          const height = Number(svg.match(/height="([0-9.]+)"/)?.[1]) || 512
          result[rel] = { width, height }
          return
        }
        const output = execFileSync('identify', ['-format', '%w %h', filePath], { encoding: 'utf8' }).trim()
        const [width, height] = output.split(/\s+/).map(Number)
        if (width && height) result[rel] = { width, height }
      } catch {
        // Ignore unreadable images; the fallback dimensions will still work.
      }
    })
  return result
}

function walk(dir) {
  const entries = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) entries.push(...walk(full))
    else entries.push(full)
  }
  return entries
}

function buildRobots(siteUrl) {
  return `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /admin/\n\nSitemap: ${siteUrl}/sitemap.xml\n`
}

function xmlEscape(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function resolveImageLoc(siteUrl, src = '') {
  return /^https?:\/\//i.test(src) ? src : `${siteUrl}${src}`
}

function imageEntry(siteUrl, image, fallbackTitle, fallbackCaption) {
  const title = xmlEscape(image.alt || fallbackTitle)
  const caption = xmlEscape(image.caption || image.alt || fallbackCaption || fallbackTitle)
  return `    <image:image>\n      <image:loc>${xmlEscape(resolveImageLoc(siteUrl, image.src))}</image:loc>\n      <image:title>${title}</image:title>\n      <image:caption>${caption}</image:caption>\n    </image:image>`
}

function urlEntry(siteUrl, urlPath, images = []) {
  const loc = `${siteUrl}${urlPath === '/' ? '' : urlPath}`
  return [
    '  <url>',
    `    <loc>${xmlEscape(loc)}</loc>`,
    ...images,
    '  </url>',
  ].join('\n')
}

function dedupeImages(items) {
  const seen = new Set()
  return items.filter((item) => {
    if (!item?.src || seen.has(item.src)) return false
    seen.add(item.src)
    return true
  })
}

function buildSitemap({ siteUrl, services, areas, projects, blogPosts }) {
  const urls = []
  urls.push(urlEntry(siteUrl, '/'))
  urls.push(urlEntry(siteUrl, '/projects'))
  projects.forEach((project) => {
    const images = dedupeImages([
      { src: project.heroImage, alt: project.heroAlt, caption: `${project.suburb} project hero image` },
      ...(project.afterImages || []),
      ...(project.beforeImages || []),
      ...((project.spaces || []).map((space) => ({ src: space.image, alt: space.alt, caption: `${project.suburb} ${space.title}` }))),
    ]).map((image) => imageEntry(siteUrl, image, `${project.suburb} custom joinery project`, `${project.suburb} custom joinery project gallery image`))
    urls.push(urlEntry(siteUrl, `/projects/${project.slug}`, images))
  })
  urls.push(urlEntry(siteUrl, '/contact'))
  services.forEach((service) => {
    const images = service.heroImage ? [imageEntry(siteUrl, { src: service.heroImage, alt: service.heroAlt }, `${service.title} service image`, service.metaDescription)] : []
    urls.push(urlEntry(siteUrl, `/${service.slug}`, images))
  })
  urls.push(urlEntry(siteUrl, '/service-areas'))
  areas.forEach((area) => {
    const images = area.heroImage ? [imageEntry(siteUrl, { src: area.heroImage, alt: area.heroAlt }, `${area.name} service area image`, area.metaDescription)] : []
    urls.push(urlEntry(siteUrl, `/service-areas/${area.slug}`, images))
  })
  // Blog listing + individual posts
  urls.push(urlEntry(siteUrl, '/blog'))
  ;(blogPosts || []).forEach((post) => {
    const images = post.heroImage ? [imageEntry(siteUrl, { src: post.heroImage, alt: post.heroAlt }, post.title, post.metaDescription)] : []
    urls.push(urlEntry(siteUrl, `/blog/${post.slug}`, images))
  })

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join('\n')}\n</urlset>\n`
}

function writeFile(filePath, contents) {
  fs.writeFileSync(filePath, contents)
}
