import homepageFaqsJson from '../content/homepage-faqs.json'
import legacyRouteRedirectsJson from '../content/legacy-route-redirects.json'
import primaryNavigationJson from '../content/primary-navigation.json'
import regionGroupsJson from '../content/region-groups.json'
import reviewsJson from '../content/reviews.json'
import siteSettingsJson from '../content/site-settings.json'
import homepageSectionsJson from '../content/homepage-sections.json'
import serviceAreasPageJson from '../content/service-areas-page.json'
import notFoundPageJson from '../content/not-found-page.json'
import trustItemsJson from '../content/trust-items.json'
import whyChooseItemsJson from '../content/why-choose-items.json'
import { projects } from './projects'

export interface Review {
  id: string
  name: string
  source: string
  quote: string
  context: string
}

export interface ProjectImage {
  src: string
  alt: string
  caption: string
}

export interface ProjectSpace {
  title: string
  text: string
  image: string
  alt: string
  servicePath: string
}

export interface Project {
  slug: string
  title: string
  shortTitle: string
  suburb: string
  summary: string
  heroImage: string
  heroAlt: string
  overview: string
  materials: string[]
  afterImages: ProjectImage[]
  beforeImages: ProjectImage[]
  spaces: ProjectSpace[]
  outcome: string
  ctaText: string
  reviewIds: string[]
}

export interface ServiceFeatureBlock {
  title: string
  text: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface BeforeAfterSection {
  title: string
  text: string
  before: string
  after: string
  beforeAlt: string
  afterAlt: string
}

export interface ServicePageData {
  slug: string
  navLabel: string
  title: string
  heroImage: string
  heroAlt: string
  metaTitle: string
  metaDescription: string
  intro: string
  includedTitle: string
  included: string[]
  featureBlocks: ServiceFeatureBlock[]
  materialsTitle: string
  materials: string[]
  projectSlugs: string[]
  beforeAfter: BeforeAfterSection
  faqs: FaqItem[]
  reviewIds: string[]
  ctaTitle: string
  ctaText: string
}

export interface AreaPageData {
  slug: string
  name: string
  region: string
  heroImage: string
  heroAlt: string
  metaTitle: string
  metaDescription: string
  intro: string
  localContext: string
  projectReferenceSlug: string
  projectReferenceLabel: string
  projectReferenceNote: string
  whyChoose: string[]
  faqs: FaqItem[]
  ctaText: string
}

export interface RegionGroup {
  name: string
  intro: string
  suburbs: { name: string; slug: string }[]
}

export interface HomepageSectionsContent {
  beforeAfterTeaser: {
    eyebrow: string
    title: string
    text: string
    beforeImage: string
    afterImage: string
    beforeAlt: string
    afterAlt: string
    buttonLabel: string
  }
  serviceAreasTeaser: {
    eyebrow: string
    title: string
    intro: string
    bodyText: string
    buttonLabel: string
  }
}

export interface ServiceAreasPageContent {
  seoTitle: string
  seoDescription: string
  heroEyebrow: string
  heroTitle: string
  heroDescription: string
  heroImage: string
  heroImageAlt: string
  listingEyebrow: string
  listingTitle: string
  listingIntro: string
  faqEyebrow: string
  faqTitle: string
  faqs: FaqItem[]
  ctaTitle: string
  ctaText: string
}

export interface NotFoundPageContent {
  seoTitle: string
  seoDescription: string
  eyebrow: string
  title: string
  description: string
  image: string
  imageAlt: string
  primaryButtonLabel: string
  secondaryButtonLabel: string
}

export interface SiteSettings {
  name: string
  siteUrl: string
  phone: string
  phoneHref: string
  email: string
  emailHref: string
  secondaryEmail?: string
  secondaryEmailHref?: string
  baseLocation: string
  serviceArea: string
  hoursSummary: string
  hoursDetail: string[]
  abn: string
  googleReviewsUrl: string
  defaultSocialImage?: string
  featuredProjectSlugs?: string[]
  featuredAreaSlugs?: string[]
}

export const siteSettings = siteSettingsJson as SiteSettings
export const reviews = reviewsJson as Review[]
export { projects } from './projects'
const serviceModules = import.meta.glob<ServicePageData>('../content/services/*.json', { eager: true, import: 'default' })
const areaModules = import.meta.glob<AreaPageData>('../content/areas/*.json', { eager: true, import: 'default' })

const allServices = Object.values(serviceModules) as ServicePageData[]

const serviceOrder = [
  'custom-joinery',
  'kitchens',
  'wardrobes',
  'laundry',
  'renovations',
  'bathrooms',
  'shelving-storage',
]

export const services = serviceOrder
  .map((slug) => allServices.find((service) => service.slug === slug))
  .filter((service): service is ServicePageData => Boolean(service))

export const areaPages = Object.values(areaModules) as AreaPageData[]
export const regionGroups = regionGroupsJson as RegionGroup[]
export const homepageFaqs = homepageFaqsJson as FaqItem[]
export const homepageSections = homepageSectionsJson as HomepageSectionsContent
export const serviceAreasPageContent = serviceAreasPageJson as ServiceAreasPageContent
export const notFoundPageContent = notFoundPageJson as NotFoundPageContent
export const trustItems = trustItemsJson as { title: string; text: string }[]
export const whyChooseItems = whyChooseItemsJson as { title: string; text: string }[]
export const primaryNavigation = primaryNavigationJson as { label: string; path: string }[]
export const legacyRouteRedirects = legacyRouteRedirectsJson as { from: string; to: string }[]

export const serviceLinks = services.map((service) => ({
  label: service.navLabel,
  path: `/${service.slug}`,
}))

const _featuredAreaSlugs = siteSettings.featuredAreaSlugs
const _featuredAreaSource =
  _featuredAreaSlugs && _featuredAreaSlugs.length > 0
    ? _featuredAreaSlugs
        .map((slug) => areaPages.find((area) => area.slug === slug))
        .filter((area): area is AreaPageData => area !== undefined)
    : areaPages.slice(0, 6)

export const featuredAreas = _featuredAreaSource

export const featuredAreaLinks = _featuredAreaSource.map((area) => ({
  label: area.name,
  path: `/service-areas/${area.slug}`,
}))

// Resolve featured projects: use explicit slugs from site-settings if present,
// otherwise fall back to the first 3 projects in the registry.
const _featuredSlugs = siteSettings.featuredProjectSlugs
const _featuredSource =
  _featuredSlugs && _featuredSlugs.length > 0
    ? _featuredSlugs
        .map((slug) => projects.find((p) => p.slug === slug))
        .filter((p): p is Project => p !== undefined)
    : projects.slice(0, 3)

export const featuredProjectCards = _featuredSource.map((project) => ({
  title: project.title,
  suburb: project.suburb,
  summary: project.summary,
  image: project.heroImage,
  imageAlt: project.heroAlt,
  path: `/projects/${project.slug}`,
}))

export const footerSuburbLinks = featuredAreaLinks

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}

export function getReviewsByIds(ids: string[]) {
  return reviews.filter((review) => ids.includes(review.id))
}
