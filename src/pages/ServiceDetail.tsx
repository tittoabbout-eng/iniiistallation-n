import { useScrollReveal } from '../hooks/useScrollReveal'

import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import CtaBanner from '../components/CtaBanner'
import FaqList from '../components/FaqList'
import PageHero from '../components/PageHero'
import ReviewGrid from '../components/ReviewGrid'
import SectionHeading from '../components/SectionHeading'
import Seo from '../components/Seo'
import SmartImage from '../components/SmartImage'
import {
  areaPages,
  getReviewsByIds,
  projects,
  services,
} from '../data/site'
import { globalContent } from '../data/globalContent'
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildLocalBusinessSchema,
  buildServiceSchema,
} from '../utils/schema'

type ServiceItem = (typeof services)[number]

export default function ServiceDetail({ service }: { service: ServiceItem }) {
  const projectSlugs = service.projectSlugs as readonly string[]
  const relatedProjects = projects.filter((project) =>
    projectSlugs.includes(project.slug),
  )
  const relatedReviews = getReviewsByIds(service.reviewIds).slice(0, 2)

  const uniqueSuburbs = Array.from(new Set(relatedProjects.map((project) => project.suburb)))
  const relatedAreas = areaPages.filter((area) => uniqueSuburbs.includes(area.name))
  const formatList = (items: string[]) => {
    if (items.length <= 1) return items[0] ?? ''
    if (items.length === 2) return `${items[0]} and ${items[1]}`
    return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
  }
  const relatedProjectIntro = uniqueSuburbs.length
    ? `Explore completed work in ${formatList(uniqueSuburbs)} to see how the layout, materials and detailing come together in real homes.`
    : 'Explore completed work to see how the layout, materials and detailing come together in real homes.'
  const schema = [
    buildLocalBusinessSchema(),
    buildServiceSchema(service),
    buildFaqSchema(service.faqs),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: service.title, path: `/${service.slug}` },
    ]),
  ]

  return (
    <>
      <Seo
        title={service.metaTitle}
        description={service.metaDescription}
        path={`/${service.slug}`}
        image={service.heroImage}
        schema={schema}
      />

      <PageHero
        eyebrow="Our services"
        title={service.title}
        description={service.intro}
        image={service.heroImage}
        imageAlt={service.heroAlt}
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
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <SectionHeading
                eyebrow="What’s included"
                title={service.includedTitle}
                intro="A clear overview of what is typically included, along with the practical details that shape the finished result."
              />
              <ul className="mt-8 space-y-3 text-sm leading-relaxed text-navy-600 md:text-base">
                {service.included.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {service.featureBlocks.map((block) => (
                <article
                  key={block.title}
                  className="rounded-3xl border border-navy-100 bg-navy-50 p-6"
                >
                  <h2 className="text-2xl font-display font-semibold text-navy-950">
                    {block.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-navy-600">
                    {block.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {relatedProjects.length ? (
        <section className="section-padding bg-navy-50">
          <div className="container-custom px-4 md:px-8">
            <SectionHeading
              eyebrow="Project examples"
              title="Related projects that show this service in real homes."
intro={relatedProjectIntro}
            />

            {relatedAreas.length ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {relatedAreas.map((area) => (
                  <Link key={area.slug} to={`/service-areas/${area.slug}`} className="pill-link">
                    {area.name}
                  </Link>
                ))}
              </div>
            ) : null}

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {relatedProjects.map((project) => (
                <article
                  key={project.slug}
                  className="overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-sm"
                >
                  <SmartImage
                    src={project.heroImage}
                    alt={project.heroAlt}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                  <div className="p-6">
                    <p className="eyebrow text-gold-600">{project.suburb}</p>
                    <h2 className="mt-3 text-2xl font-display font-semibold text-navy-950">
                      {project.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-navy-600">
                      {project.summary}
                    </p>
                    <Link
                      to={`/projects/${project.slug}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-600 transition-colors hover:text-gold-500"
                    >
                      View project page <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-padding bg-white">
        <div className="container-custom px-4 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <BeforeAfterSlider
              before={service.beforeAfter.before}
              after={service.beforeAfter.after}
              beforeAlt={service.beforeAfter.beforeAlt}
              afterAlt={service.beforeAfter.afterAlt}
            />

            <div>
              <SectionHeading
                eyebrow="Before and after"
                title={service.beforeAfter.title}
                intro={service.beforeAfter.text}
              />

              <div className="mt-8 rounded-3xl border border-navy-100 bg-navy-50 p-6">
                <h2 className="text-2xl font-display font-semibold text-navy-950">
                  {service.materialsTitle}
                </h2>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-navy-600">
                  {service.materials.map((material) => (
                    <li key={material}>• {material}</li>
                  ))}
                </ul>
                <p className="mt-5 text-sm leading-relaxed text-navy-600">Clear quotes, room-by-room priorities and project examples help keep the scope grounded before work starts.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedReviews.length ? (
        <section className="section-padding bg-navy-50">
          <div className="container-custom px-4 md:px-8">
            <SectionHeading
              eyebrow="Client reviews"
              title="What clients say about the quality of the work."
            />
            <div className="mt-10">
              <ReviewGrid items={relatedReviews} />
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-padding bg-white">
        <div className="container-custom px-4 md:px-8">
          <SectionHeading
            eyebrow="Common questions."
            title="Questions homeowners often ask before getting in touch."
          />
          <div className="mt-10">
            <FaqList items={service.faqs} />
          </div>
        </div>
      </section>

      <CtaBanner title={service.ctaTitle} text={service.ctaText} />
    </>
  )
}
