
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

type ProjectImageLike = {
  src: string
  alt: string
  caption: string
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
      streetAddress: 'Liverpool',
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '8',
      bestRating: '5',
      worstRating: '1',
    },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: 'NSW Licensed Contractor — Kitchen, Laundry & Bathroom Renovations',
      credentialCategory: 'licence',
    },
    identifier: {
      '@type': 'PropertyValue',
      name: 'ABN',
      value: siteSettings.abn,
    },
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

export function buildServiceSchema(service: {
  title: string
  metaDescription: string
  slug: string
  heroImage: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.metaDescription,
    url: `${siteSettings.siteUrl}/${service.slug}`,
    image: `${siteSettings.siteUrl}${service.heroImage}`,
    provider: {
      '@type': 'LocalBusiness',
      name: siteSettings.name,
      url: siteSettings.siteUrl,
      telephone: siteSettings.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Liverpool',
        addressRegion: 'NSW',
        postalCode: '2170',
        addressCountry: 'AU',
      },
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Sydney, NSW',
    },
    serviceType: service.title,
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${siteSettings.siteUrl}/contact`,
      servicePhone: siteSettings.phone,
    },
  }
}

export function buildProjectSchema(project: {
  title: string
  summary: string
  slug: string
  heroImage: string
  heroAlt: string
  suburb: string
  afterImages: readonly ProjectImageLike[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    url: `${siteSettings.siteUrl}/projects/${project.slug}`,
    locationCreated: {
      '@type': 'Place',
      name: project.suburb,
      address: {
        '@type': 'PostalAddress',
        addressLocality: project.suburb,
        addressRegion: 'NSW',
        addressCountry: 'AU',
      },
    },
    creator: {
      '@type': 'LocalBusiness',
      name: siteSettings.name,
      url: siteSettings.siteUrl,
      telephone: siteSettings.phone,
    },
    image: [
      {
        '@type': 'ImageObject',
        url: `${siteSettings.siteUrl}${project.heroImage}`,
        name: project.heroAlt,
      },
      ...project.afterImages.slice(0, 6).map((img) => ({
        '@type': 'ImageObject',
        url: `${siteSettings.siteUrl}${img.src}`,
        name: img.alt,
        caption: img.caption,
      })),
    ],
  }
}
