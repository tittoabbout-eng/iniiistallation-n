import { Link, useParams } from 'react-router-dom'
import { getBlogPost } from '../data/blog'
import NotFound from './NotFound'
import { siteSettings } from '../data/site'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = getBlogPost(slug ?? '')

  if (!post) return <NotFound />

  return (
    <>
      <title>{post.metaTitle}</title>
      <meta name="description" content={post.metaDescription} />
      <link rel="canonical" href={`${siteSettings.siteUrl}/blog/${post.slug}`} />

      <section className="bg-navy-950 pb-16 pt-32 md:pt-40">
        <div className="container-custom px-4 md:px-8">
          <Link
            to="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-gold-300 hover:text-gold-200"
          >
            Back to all articles
          </Link>
          <p className="mb-4 mt-6 text-xs font-semibold uppercase tracking-widest text-gold-300">
            {post.category}
          </p>
          <h1 className="font-display text-3xl font-bold text-white md:text-5xl max-w-3xl">
            {post.title}
          </h1>
        </div>
      </section>

      <section className="py-12">
        <div className="container-custom px-4 md:px-8">
          <div className="aspect-[16/9] max-h-[520px] overflow-hidden rounded-2xl">
            <img
              src={post.heroImage}
              alt={post.heroAlt}
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-custom px-4 md:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="mb-12 text-xl text-navy-600 leading-relaxed border-l-4 border-gold-400 pl-6">
              {post.excerpt}
            </p>

            <div className="space-y-10">
              {post.sections.map((section, i) => (
                <div key={i}>
                  <h2 className="mb-4 font-display text-2xl font-bold text-navy-950">
                    {section.heading}
                  </h2>
                  <p className="text-navy-700 leading-relaxed text-lg">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 rounded-2xl bg-navy-950 p-8 md:p-10">
              <h2 className="font-display text-2xl font-bold text-white">
                {post.ctaTitle}
              </h2>
              <p className="mt-4 text-navy-200">{post.ctaText}</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-block rounded-full bg-gold-500 px-8 py-4 text-center font-semibold text-navy-950 transition-colors hover:bg-gold-400"
                >
                  Request a quote
                </Link>
                <a
                  href={siteSettings.phoneHref}
                  className="inline-block rounded-full border border-white/20 px-8 py-4 text-center font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Call {siteSettings.phone}
                </a>
              </div>
            </div>

            <div className="mt-12">
              <Link
                to="/blog"
                className="text-sm font-semibold text-gold-700 hover:text-gold-600"
              >
                Back to all articles
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
