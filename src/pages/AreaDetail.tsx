import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import CtaBanner from '../components/CtaBanner'
import FaqList from '../components/FaqList'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Seo from '../components/Seo'
import SmartImage from '../components/SmartImage'
import {
  areaPages,
  getProjectBySlug,
  services, 
} from '../data/site'
import { globalContent } from '../data/globalContent'
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildLocalBusinessSchema,
} from '../utils/schema'

type AreaItem = (typeof areaPages)[number]

const serviceSummaries: Record<string, string> = {
  'kitchens-renovations':
    'Custom kitchen design, cabinetry and joinery-led renovation scope planned around layout and finish quality.',
  'custom-joinery':
    'Murphy beds, studies, hallway storage, living joinery and room-specific storage solutions built to suit the home.',
  wardrobes:
    'Built-ins and walk-ins with better internal planning, refined finishes and stronger use of available space.',
  laundry:
    'Compact laundries, concealed utility spaces, stacked appliance setups and full-height cabinetry.',
  renovations:
    'Broader renovation-ready joinery across multiple rooms, with the cabinetry scope tied together as one coherent project.',
}

export default function AreaDetail({ area }: { area: AreaItem }) {
  const project = getProjectBySlug(area.projectReferenceSlug)
  const schema = [
    buildLocalBusinessSchema(),
    buildFaqSchema(area.faqs),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Service Areas', path: '/service-areas' },
      { name: area.name, path: `/service-areas/${area.slug}` },
    ]),
  ]

  return (
    <>
      <Seo
        title={area.metaTitle}
        description={area.metaDescription}
        path={`/service-areas/${area.slug}`}
        image={area.heroImage}
        schema={schema}
      />

      <PageHero
        eyebrow={`${area.region} service area`}
        title={`Custom joinery & renovations in ${area.name}`}
        description={area.intro}
        image={area.heroImage}
        imageAlt={area.heroAlt}
        actions={
          <>
            <Link to="/contact" className="btn-primary">
              {globalContent.cta.primaryLabel}
            </Link>
            <Link to="/service-areas" className="btn-outline border-white text-white hover:bg-white hover:text-navy-950">
              Back to service areas
            </Link>
          </>
        }
      />

      <section className="section-padding bg-white">
        <div className="container-custom px-4 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <SectionHeading
                eyebrow="Local fit"
                title={`Why projects in ${area.name} usually benefit from a tailored joinery approach.`}
                intro={area.localContext}
              />
            </div>

            <div className="rounded-3xl border border-navy-100 bg-navy-50 p-6">
              <h2 className="text-2xl font-display font-semibold text-navy-950">
                Why homeowners in {area.name} choose us
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-navy-600">
                {area.whyChoose.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {project ? (
        <section className="section-padding bg-navy-50">
          <div className="container-custom px-4 md:px-8">
            <SectionHeading
              eyebrow="Nearby project example"
              title={area.projectReferenceLabel || `A nearby project example relevant to homes in ${area.name}.`}
              intro={area.projectReferenceNote || `This project may be from a nearby suburb, but it shows the level of finish, layout thinking and joinery detailing clients in ${area.name} can expect.`}
            />

            <article className="mt-12 overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-sm lg:grid lg:grid-cols-[1fr_1fr]">
              <SmartImage
                src={project.heroImage}
                alt={project.heroAlt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="p-6 md:p-8">
                <p className="eyebrow text-gold-700">Nearby completed project</p>
                <h2 className="mt-3 text-3xl font-display font-semibold text-navy-950">
                  {project.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-navy-600">
                  {area.projectReferenceNote || `This nearby project gives a clearer picture of the finish quality, materials and practical joinery thinking that often suits homes in ${area.name}.`} 
                </p>
                <p className="mt-4 text-sm leading-relaxed text-navy-600">
                  {project.summary}
                </p>
                <Link
                  to={`/projects/${project.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-700 transition-colors hover:text-gold-600"
                >
                  View project page <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          </div>
        </section>
      ) : null}

      <section className="section-padding bg-white">
        <div className="container-custom px-4 md:px-8">
          <SectionHeading
            eyebrow="Services in this suburb"
            title={`Core joinery services we complete in and around ${area.name}.`}
            intro={`Explore the main services homeowners ask us for in ${area.name}, from kitchens and wardrobes through to custom storage, laundries and renovation-led cabinetry.`}
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {services.map((service) => (
              <article
                key={service.slug}
                className="overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-sm"
              >
                <SmartImage
                  src={service.heroImage}
                  alt={service.heroAlt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[5/4] w-full object-cover"
                  sizes="(min-width: 1280px) 20vw, (min-width: 768px) 50vw, 100vw"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-display font-semibold text-navy-950">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-navy-600">
                    {serviceSummaries[service.slug]}
                  </p>
                  <Link
                    to={`/${service.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-700 transition-colors hover:text-gold-600"
                  >
                    Explore service <ArrowRight size={16} />
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
            eyebrow="FAQs"
            title={`Common questions about joinery projects in ${area.name}.`}
          />
          <div className="mt-10">
            <FaqList items={area.faqs} />
          </div>
        </div>
      </section>

      <CtaBanner
        title={area.ctaText}
        text={`If you are planning a project in ${area.name}, send through your brief, drawings or inspiration images and we can help you work out the right joinery scope and next step.`}
      />
    </>
  )
}
