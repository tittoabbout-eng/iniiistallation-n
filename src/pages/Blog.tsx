import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { siteSettings } from '../data/site'

const posts = [
  {
    slug: 'custom-joinery-vs-flat-pack-sydney',
    title: 'Custom Joinery vs Flat Pack: Which Is Better for Your Sydney Home?',
    excerpt: 'Flat pack is cheaper upfront. Custom joinery lasts longer and fits properly. The right answer depends on what you are renovating and why.',
    category: 'Custom Joinery',
    publishDate: '2025-04-10',
    heroImage: '/willoughby/willoughby-kitchen-wide-after.jpg',
    heroAlt: 'Custom joinery kitchen in Sydney',
  },
  {
    slug: 'kitchen-renovation-cost-sydney',
    title: 'How Much Does a Kitchen Renovation Cost in Sydney?',
    excerpt: 'Kitchen renovation costs in Sydney vary significantly depending on layout, materials and scope. Here is an honest breakdown from a contractor who does this work every week.',
    category: 'Kitchen Renovations',
    publishDate: '2025-04-01',
    heroImage: '/willoughby/willoughby-kitchen-hero.jpg',
    heroAlt: 'Completed custom kitchen renovation in Sydney',
  },
]

export default function Blog() {
  return (
    <>
      <title>Renovation & Joinery Advice for Sydney Homeowners | InsideOut Joinery</title>
      <meta
        name="description"
        content="Practical renovation and joinery advice from a licensed Sydney contractor. Kitchen costs, custom joinery vs flat pack, how long renovations take and more."
      />
      <link rel="canonical" href={`${siteSettings.siteUrl}/blog`} />

      <section className="bg-navy-950 pb-16 pt-32 md:pt-40">
        <div className="container-custom px-4 md:px-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold-300">
            Renovation advice
          </p>
          <h1 className="font-display text-4xl font-bold text-white md:text-5xl">
            Practical advice for Sydney homeowners planning a renovation.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-navy-200">
            Real answers to the questions people ask before they renovate — from a contractor who works on these projects every week.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-custom px-4 md:px-8">
          <div className="grid gap-10 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group block overflow-hidden rounded-2xl border border-navy-100 bg-white transition-shadow hover:shadow-lg"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={post.heroImage}
                    alt={post.heroAlt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold-600">
                    {post.category}
                  </p>
                  <h2 className="mb-3 font-display text-xl font-bold text-navy-950 group-hover:text-gold-700 md:text-2xl">
                    {post.title}
                  </h2>
                  <p className="text-navy-600">{post.excerpt}</p>
                  <p className="mt-6 text-sm font-semibold text-gold-700">
                    Read article →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-navy-100 bg-navy-950 py-16">
        <div className="container-custom px-4 text-center md:px-8">
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
            Ready to get a quote?
          </h2>
          <p className="mt-4 text-navy-200">
            Call us on{' '}
            <a href={siteSettings.phoneHref} className="font-bold text-gold-300 hover:text-gold-200">
              {siteSettings.phone}
            </a>{' '}
            or send through your plans and photos.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-block rounded-full bg-gold-500 px-8 py-4 font-semibold text-navy-950 transition-colors hover:bg-gold-400"
          >
            Request a quote
          </Link>
        </div>
      </section>
    </>
  )
}
