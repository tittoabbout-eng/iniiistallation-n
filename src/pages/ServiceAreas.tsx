import { Link } from 'react-router-dom'
import CtaBanner from '../components/CtaBanner'
import FaqList from '../components/FaqList'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Seo from '../components/Seo'
import { regionGroups, serviceAreasPageContent } from '../data/site'
import { globalContent } from '../data/globalContent'
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildLocalBusinessSchema,
} from '../utils/schema'

export default function ServiceAreas() {
  const content = serviceAreasPageContent
  const schema = [
    buildLocalBusinessSchema(),
    buildFaqSchema(content.faqs),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Service Areas', path: '/service-areas' },
    ]),
  ]

  return (
    <>
      <Seo
        title={content.seoTitle}
        description={content.seoDescription}
        path="/service-areas"
        image="/darlinghurst/darlinghurst-kitchen-hero.jpg"
        schema={schema}
      />

      <PageHero
        eyebrow={content.heroEyebrow}
        title={content.heroTitle}
        description={content.heroDescription}
        image={content.heroImage}
        imageAlt={content.heroImageAlt}
        actions={
          <>
            <Link to="/contact" className="btn-primary">
              {globalContent.cta.primaryLabel}
            </Link>
            <Link to="/projects" className="btn-outline border-white text-white hover:bg-white hover:text-navy-950">
              {globalContent.cta.secondaryProjectsLabel}
            </Link>
          </>
        }
      />

      <section className="section-padding bg-white">
        <div className="container-custom px-4 md:px-8">
          <SectionHeading
            eyebrow={content.listingEyebrow}
            title={content.listingTitle}
            intro={content.listingIntro}
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {regionGroups.map((group) => (
              <article
                key={group.name}
                className="rounded-3xl border border-navy-100 bg-navy-50 p-6"
              >
                <h2 className="text-2xl font-display font-semibold text-navy-950">
                  {group.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-navy-600">
                  {group.intro}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {group.suburbs.map((suburb) => (
                    <Link
                      key={suburb.slug}
                      to={`/service-areas/${suburb.slug}`}
                      className="pill-link"
                    >
                      {suburb.name}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy-50">
        <div className="container-custom px-4 md:px-8">
          <SectionHeading
            eyebrow={content.faqEyebrow}
            title={content.faqTitle}
          />
          <div className="mt-10">
            <FaqList items={content.faqs} />
          </div>
        </div>
      </section>

      <CtaBanner
        title={content.ctaTitle}
        text={content.ctaText}
      />
    </>
  )
}
