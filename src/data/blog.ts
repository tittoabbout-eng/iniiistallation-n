export interface BlogSection {
  heading: string
  body: string
}

export interface BlogFaqItem {
  question: string
  answer: string
}

export interface BlogPost {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  publishedDate: string
  category: string
  heroImage: string
  heroAlt: string
  excerpt: string
  sections: BlogSection[]
  faqs: BlogFaqItem[]
  relatedServiceSlugs: string[]
  reviewIds: string[]
}

const blogModules = import.meta.glob<BlogPost>('../content/blog/*.json', {
  eager: true,
  import: 'default',
})

export const blogPosts: BlogPost[] = Object.values(blogModules).sort(
  (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime(),
)

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}
