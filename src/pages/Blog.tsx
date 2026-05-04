import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import CtaBanner from '../components/CtaBanner'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Seo from '../components/Seo'
import SmartImage from '../components/SmartImage'
import { siteSettings } from '../data/site'
import { blogPosts } from '../data/blog'
import { buildBreadcrumbSchema, buildLocalBusinessSchema } from '../utils/schema'

export default function Blog() {
  const schema = [
    buildLocalBusinessSchema(),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
    ]),
  ]

  return (
    <>
      <Seo
        title={`Renovation & Joinery Guides | ${siteSettings.name}`}
        description="Practical guides on kitchen renovations, custom joinery, bathrooms, wardrobes and what to expect when renovating in Sydney. Written by a working Sydney joinery and renovation contractor."
        path="/blog"
        schema={schema}
      />

      <PageHero
        eyebrow="Renovation guides"
        title="Practical advice from a working Sydney renovator"
        description="Real answers to the questions homeowners ask before and during a renovation. No generic content — just trade-level thinking on kitchens, joinery, bathrooms and what actually drives project costs."
        image="/willoughby/willoughby-kitchen-hero.jpg"
        imageAlt="Custom kitchen renovation in Willoughby Sydney"
        actions={
          <Link to="/contact" className="btn-primary">
            Get a quote
          </Link>
        }
      />

      <section className="section-padding bg-white">
        <div className="container-custom px-4 md:px-8">
          <SectionHeading
            eyebrow="All posts"
            title="Guides & renovation advice"
            intro="Straight answers on costs, timelines, materials and how to get the best outcome from a joinery or renovation project in Sydney."
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <SmartImage
                  src={post.heroImage}
                  alt={post.heroAlt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/9] w-full object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <div className="p-6">
                  <p className="eyebrow text-gold-600">{post.category}</p>
                  <h2 className="mt-3 text-xl font-display font-semibold text-navy-950 leading-snug">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-navy-600">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <time
                      dateTime={post.publishedDate}
                      className="text-xs text-navy-400"
                    >
                      {new Date(post.publishedDate).toLocaleDateString('en-AU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 transition-colors hover:text-gold-500"
                    >
                      Read more <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to start your renovation?"
        text="Send us your plans, photos or a rough brief and we can help shape the right joinery and renovation scope for your home."
      />
    </>
  )
}
