
import { useEffect } from 'react'
import { siteSettings } from '../data/site'

type SchemaValue = Record<string, unknown> | Array<Record<string, unknown>>

type Props = {
  title: string
  description: string
  path?: string
  image?: string
  schema?: SchemaValue
  noIndex?: boolean
}

const DEFAULT_IMAGE = '/og-insideoutjoinery-au.jpg'

export default function Seo({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  schema,
  noIndex = false,
}: Props) {
  useEffect(() => {
    const normalizedPath = path === '/' ? '' : path
    const canonicalHref = `${siteSettings.siteUrl}${normalizedPath}`
    const imageUrl = image.startsWith('http') ? image : `${siteSettings.siteUrl}${image}`

    document.title = title

    const setMeta = (attribute: 'name' | 'property', key: string, content: string) => {
      let tag = document.head.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attribute, key)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    const setLink = (rel: string, href: string) => {
      let link = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', rel)
        document.head.appendChild(link)
      }
      link.setAttribute('href', href)
    }

    setMeta('name', 'description', description)
    setMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow')
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:url', canonicalHref)
    setMeta('property', 'og:image', imageUrl)
    setMeta('property', 'og:site_name', siteSettings.name)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', imageUrl)

    const verification = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION
    if (verification) {
      setMeta('name', 'google-site-verification', verification)
    }

    setLink('canonical', canonicalHref)

    document
      .querySelectorAll('script[data-seo-schema="true"]')
      .forEach((existingScript) => existingScript.remove())

    if (schema) {
      const schemaItems = Array.isArray(schema) ? schema : [schema]
      schemaItems.forEach((item) => {
        const script = document.createElement('script')
        script.type = 'application/ld+json'
        script.dataset.seoSchema = 'true'
        script.text = JSON.stringify(item)
        document.head.appendChild(script)
      })
    }
  }, [description, image, noIndex, path, schema, title])

  return null
}
