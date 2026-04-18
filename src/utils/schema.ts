
import { areaPages, siteSettings } from '../data/site'
import { globalContent } from '../data/globalContent'

type FaqLike = {
  question: string
  answer: string
}

type BreadcrumbItem = {
  name: string
  path: string
}

export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness', 'KitchenRemodeler'],
    name: siteSettings.name,
    image: `${siteSettings.siteUrl}/og-insideoutjoinery-au.jpg`,
    url: siteSettings.siteUrl,
    telephone: siteSettings.phone,
    email: siteSettings.email,
    description: globalContent.brand.schemaDescription,
    areaServed: areaPages.map((area) => area.name),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Liverpool',
      addressRegion: 'NSW',
      postalCode: '2170',
      addressCountry: 'AU',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: siteSettings.phone,
      email: siteSettings.email,
      areaServed: 'Sydney',
      availableLanguage: 'English',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:30',
        closes: '16:30',
      },
    ],
    sameAs: [siteSettings.googleReviewsUrl],
    priceRange: '$$',
  }
}

export function buildFaqSchema(items: readonly FaqLike[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function buildBreadcrumbSchema(items: readonly BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteSettings.siteUrl}${item.path === '/' ? '' : item.path}`,
    })),
  }
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteSettings.name,
    url: siteSettings.siteUrl,
    logo: `${siteSettings.siteUrl}/favicon-32x32.png`,
    email: siteSettings.email,
    telephone: siteSettings.phone,
    sameAs: [siteSettings.googleReviewsUrl],
  }
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteSettings.name,
    url: siteSettings.siteUrl,
    inLanguage: 'en-AU',
  }
}
