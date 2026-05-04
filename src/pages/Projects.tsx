
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import CtaBanner from '../components/CtaBanner'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Seo from '../components/Seo'
import SmartImage from '../components/SmartImage'
import { projects, serviceLinks } from '../data/site'
import { projectContent } from '../data/projectContent'
import { globalContent } from '../data/globalContent'
import { buildBreadcrumbSchema, buildLocalBusinessSchema } from '../utils/schema'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Projects() {
  useScrollReveal()
  const schema = [
    buildLocalBusinessSchema(),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
    ]),
  ]

  return (
    <>
      <Seo
        title={projectContent.listingPage.seoTitle}
        description={projectContent.listingPage.seoDescription}
        path="/projects"
        image="/epping/epping-hero-open-plan.jpg"
        schema={schema}
      />

      <PageHero
        eyebrow={projectContent.listingPage.heroEyebrow}
        title={projectContent.listingPage.heroTitle}
        description={projectContent.listingPage.heroDescription}
        image={projectContent.listingPage.heroImage}
        imageAlt={projectContent.listingPage.heroImageAlt}
        actions={
          <>
            <Link to="/contact" className="btn-primary">
              {globalContent.cta.primaryLabel}
            </Link>
            <Link to="/service-areas" className="btn-outline border-white text-white hover:bg-white hover:text-navy-950">
              View service areas
            </Link>
          </>
        }
      />

      <section className="section-padding bg-white">
        <div className="container-custom px-4 md:px-8">
          <SectionHeading
            eyebrow={projectContent.listingPage.featuredEyebrow}
            title={projectContent.listingPage.featuredTitle}
intro={projectContent.listingPage.featuredIntro}
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.slug}
                className="img-zoom reveal overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
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
                  <ul className="mt-4 space-y-2 text-sm text-navy-600">
                    {project.spaces.slice(0, 3).map((space) => (
                      <li key={space.title}>• {space.title}</li>
                    ))}
                  </ul>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-600 transition-colors hover:text-gold-500"
                  >
                    Open full project page <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy-50">
        <div className="container-custom px-4 md:px-8">
          <SectionHeading
            eyebrow={projectContent.listingPage.relatedServicesEyebrow}
           title={projectContent.listingPage.relatedServicesTitle}
intro={projectContent.listingPage.relatedServicesIntro}
          />

          <div className="mt-10 flex flex-wrap gap-3">
            {serviceLinks.map((service) => (
              <Link key={service.path} to={service.path} className="pill-link">
                {service.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title={projectContent.listingPage.ctaTitle}
        text={projectContent.listingPage.ctaText}
      />
    </>
  )
}
