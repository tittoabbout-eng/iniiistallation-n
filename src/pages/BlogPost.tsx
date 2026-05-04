import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import CtaBanner from '../components/CtaBanner'
import FaqList from '../components/FaqList'
import ReviewGrid from '../components/ReviewGrid'
import Seo from '../components/Seo'
import SmartImage from '../components/SmartImage'
import { getReviewsByIds, services } from '../data/site'
import { BlogPost as BlogPostType } from '../data/blog'
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildLocalBusinessSchema,
} from '../utils/schema'

export default function BlogPost({ post }: { post: BlogPostType }) {
  const relatedReviews = getReviewsByIds(post.reviewIds).slice(0, 2)
  const relatedServices = services.filter((s) =>
    post.relatedServiceSlugs.includes(s.slug),
  )

  const schema = [
    buildLocalBusinessSchema(),
    buildFaqSchema(post.faqs),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.metaDescription,
      image: post.heroImage,
      datePublished: post.publishedDate,
      author: {
        '@type': 'Organization',
        name: 'InsideOut Joinery & Renos',
      },
    },
  ]

  return (
    <>
      <Seo
        title={post.metaTitle}
        description={post.metaDescription}
        path={`/blog/${post.slug}`}
        image={post.heroImage}
        schema={schema}
      />

      <div className="pt-28 md:pt-32">
        <div className="container-custom px-4 md:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy-500 transition-colors hover:text-gold-500"
          >
            <ArrowLeft size={16} /> Back to all posts
          </Link>
        </div>
      </div>

      <article className="section-padding bg-white">
        <div className="container-custom px-4 md:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow text-gold-600">{post.category}</p>
            <h1 className="mt-4 text-3xl font-display font-bold text-navy-950 leading-snug md:text-4xl">
              {post.title}
            </h1>
            <time
              dateTime={post.publishedDate}
              className="mt-4 block text-sm text-navy-400"
            >
              {new Date(post.publishedDate).toLocaleDateString('en-AU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>

            <SmartImage
              src={post.heroImage}
              alt={post.heroAlt}
              loading="eager"
              className="mt-8 aspect-[16/9] w-full rounded-3xl object-cover"
              sizes="(min-width: 768px) 768px, 100vw"
            />

            <div className="mt-10 space-y-10">
              {post.sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="text-xl font-display font-semibold text-navy-950">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {section.body.split('\n\n').map((paragraph, i) => (
                      <p
                        key={i}
                        className="text-base leading-relaxed text-navy-700 [&_a]:font-semibold [&_a]:text-gold-600 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-gold-600"
                        dangerouslySetInnerHTML={{ __html: paragraph }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>

      {post.faqs.length > 0 && (
        <section className="section-padding bg-navy-50">
          <div className="container-custom px-4 md:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-display font-bold text-navy-950">
                Frequently asked questions
              </h2>
              <div className="mt-8">
                <FaqList items={post.faqs} />
              </div>
            </div>
          </div>
        </section>
      )}

      {relatedReviews.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom px-4 md:px-8">
            <h2 className="text-2xl font-display font-bold text-navy-950">
              What clients say
            </h2>
            <div className="mt-8">
              <ReviewGrid items={relatedReviews} />
            </div>
          </div>
        </section>
      )}

      {relatedServices.length > 0 && (
        <section className="section-padding bg-navy-50">
          <div className="container-custom px-4 md:px-8">
            <h2 className="text-xl font-display font-semibold text-navy-950">
              Related services
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {relatedServices.map((service) => (
                <Link
                  key={service.slug}
                  to={`/${service.slug}`}
                  className="inline-flex items-center gap-2 pill-link"
                >
                  {service.title} <ArrowRight size={14} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner
        title="Ready to start your project?"
        text="Send us your plans, photos or a rough brief and we can help shape the right joinery and renovation scope for your home."
      />
    </>
  )
}
