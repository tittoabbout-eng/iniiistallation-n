import post1 from '../content/blog/kitchen-renovation-cost-sydney.json'
import post2 from '../content/blog/custom-joinery-vs-flat-pack-sydney.json'

export interface BlogSection {
  heading: string
  body: string
}

export interface BlogPost {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  publishDate: string
  category: string
  heroImage: string
  heroAlt: string
  excerpt: string
  sections: BlogSection[]
  ctaTitle: string
  ctaText: string
  relatedServices: string[]
  relatedPosts: string[]
}

export const blogPosts: BlogPost[] = [post2, post1]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}
