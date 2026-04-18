import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Phone } from 'lucide-react'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import CtaBanner from '../components/CtaBanner'
import FaqList from '../components/FaqList'
import PageHero from '../components/PageHero'
import ReviewGrid from '../components/ReviewGrid'
import SectionHeading from '../components/SectionHeading'
import Seo from '../components/Seo'
import SmartImage from '../components/SmartImage'
import {
  featuredAreaLinks,
  featuredProjectCards,
  homepageFaqs,
  homepageSections,
  reviews,
  services,
  serviceLinks,
  siteSettings,
  trustItems,
  whyChooseItems,
} from '../data/site'
import { globalContent } from '../data/globalContent'
import { trackEvent } from '../utils/trackEvent'
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildLocalBusinessSchema,
  buildOrganizationSchema,
  buildWebsiteSchema,
} from '../utils/schema'


export default function Home() {
  const highlightedAreas = featuredAreaLinks
  const home = globalContent.homepage
  const homeSections = homepageSections
  const schema = [
    buildLocalBusinessSchema(),
    buildOrganizationSchema(),
    buildWebsiteSchema(),
    buildFaqSchema(homepageFaqs),
    buildBreadcrumbSchema([{ name: 'Home', path: '/' }]),
  ]

  return (
    <>
      <Seo
        title={home.seoTitle}
        description={home.seoDescription}
        path="/"
        image="/willoughby/willoughby-kitchen-hero.jpg"
        schema={schema}
      />

      <PageHero
        eyebrow={home.heroEyebrow}
        title={home.heroTitle}
        description={home.heroDescription}
        image={home.heroImage}
        imageAlt={home.heroImageAlt}
          actions={
          <>
            <Link
              to="/contact"
              className="btn-primary"
              onClick={() => trackEvent('cta_click', { location: 'hero', type: 'quote' })}
            >
              {globalContent.cta.primaryLabel}
            </Link>
            <a
              href={siteSettings.phoneHref}
              className="btn-outline border-white text-white hover:bg-white hover:text-navy-950"
              onClick={() => trackEvent('cta_click', { location: 'hero', type: 'phone' })}
            >
              <Phone size={16} />
              Call {siteSettings.phone}
            </a>
          </>
        }
      />
      <section className="bg-navy-950 pb-8">
        <div className="container-custom px-4 md:px-8">
          <p className="text-sm font-medium text-white/80 md:text-base">
            {home.quoteHelperText}
          </p>
        </div>
      </section>

      <section className="border-b border-t border-navy-100 bg-white">
        <div className="container-custom grid gap-px px-4 py-0 md:grid-cols-4 md:px-8">
          {home.trustBarItems.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 border-b border-navy-100 py-5 md:border-b-0 md:border-r md:last:border-r-0 md:px-5"
            >
              <CheckCircle2 size={18} className="shrink-0 text-gold-700" />
              <span className="text-sm font-semibold text-navy-900">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom px-4 md:px-8">
          <SectionHeading
            eyebrow={home.services.eyebrow}
            title={home.services.title}
            intro={home.services.intro}
            align="center"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {services.map((service) => (
              <article
                key={service.slug}
                className="group overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
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
                    {home.services.cardCopy[service.slug as keyof typeof home.services.cardCopy]}
                  </p>
                  <Link
                    to={`/${service.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-700 transition-colors hover:text-gold-600"
                  >
                    View service page <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            {serviceLinks.map((service) => (
              <Link key={service.path} to={service.path} className="pill-link">
                {service.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy-50">
        <div className="container-custom px-4 md:px-8">
          <SectionHeading
            eyebrow={home.featuredProjects.eyebrow}
            title={home.featuredProjects.title}
            intro={home.featuredProjects.intro}
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {featuredProjectCards.map((project) => (
              <article
                key={project.path}
                className="overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <SmartImage
                  src={project.image}
                  alt={project.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
                <div className="p-6">
                  <p className="eyebrow text-gold-700">{project.suburb}</p>
                  <h2 className="mt-3 text-2xl font-display font-semibold text-navy-950">
                    {project.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-navy-600">
                    {project.summary}
                  </p>
                  <Link
                    to={project.path}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-700 transition-colors hover:text-gold-600"
                  >
                    View full project page <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom px-4 md:px-8">
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            {trustItems.map((item) => (
              <article key={item.title} className="rounded-3xl border border-navy-100 bg-navy-50 p-5">
                <h2 className="text-lg font-display font-semibold text-navy-950">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">{item.text}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeading
              eyebrow={home.whyChoose.eyebrow}
              title={home.whyChoose.title}
              intro={home.whyChoose.intro}
            />

            <div className="grid gap-5 md:grid-cols-2">
              {whyChooseItems.map((item) => (
                <article
                  key={item.title}
                  className="rounded-3xl border border-navy-100 bg-navy-50 p-6"
                >
                  <h2 className="text-xl font-display font-semibold text-navy-950">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-navy-600">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy-50">
        <div className="container-custom px-4 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <BeforeAfterSlider
              before={homeSections.beforeAfterTeaser.beforeImage}
              after={homeSections.beforeAfterTeaser.afterImage}
              beforeAlt={homeSections.beforeAfterTeaser.beforeAlt}
              afterAlt={homeSections.beforeAfterTeaser.afterAlt}
            />

            <div>
              <p className="eyebrow text-gold-700">{homeSections.beforeAfterTeaser.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-display font-bold text-navy-950 md:text-4xl">
                {homeSections.beforeAfterTeaser.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-navy-600">
                {homeSections.beforeAfterTeaser.text}
              </p>
              <div className="mt-6">
                <Link
                  to="/projects"
                  className="btn-primary"
                  onClick={() => trackEvent('cta_click', { location: 'before_after_teaser', type: 'view_projects' })}
                >
                  {homeSections.beforeAfterTeaser.buttonLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom px-4 md:px-8">
          <div className="rounded-3xl border border-navy-100 bg-navy-50 p-8 md:p-10">
            <SectionHeading
              eyebrow="Service areas"
              title="Sydney-wide service across established homes and premium residential areas."
              intro="We work across Sydney, including the Lower North Shore, Eastern Suburbs, Inner West, Hills District and surrounding suburbs, delivering custom joinery, kitchen renovations and renovation-led cabinetry with a tailored approach."
            />

            <p className="mt-6 max-w-4xl text-base leading-relaxed text-navy-600">
              Start with our main{' '}
              <Link to="/service-areas" className="font-semibold text-gold-700 hover:text-gold-600">
                service areas page
              </Link>{' '}
              or jump straight into suburb pages for{' '}
              {highlightedAreas.map((area, index) => (
                <span key={area.path}>
                  <Link
                    to={area.path}
                    className="font-semibold text-gold-700 hover:text-gold-600"
                  >
                    {area.label}
                  </Link>
                  {index < highlightedAreas.length - 2
                    ? ', '
                    : index === highlightedAreas.length - 2
                      ? ' and '
                      : ''}
                </span>
              ))}
              . You can also explore our core pages for{' '}
              {serviceLinks.map((service, index) => (
                <span key={service.path}>
                  <Link to={service.path} className="font-semibold text-gold-700 hover:text-gold-600">
                    {service.label}
                  </Link>
                  {index < serviceLinks.length - 2
                    ? ', '
                    : index === serviceLinks.length - 2
                      ? ' and '
                      : ''}
                </span>
              ))}
              .
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy-50">
        <div className="container-custom px-4 md:px-8">
          <SectionHeading
            eyebrow="Google reviews"
            title="What clients say about working with us."
            intro="Recent reviews that reflect our communication, quoting clarity, finish quality and the overall experience of working with us."
            align="center"
          />
          <div className="mt-12">
            <ReviewGrid items={reviews} />
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom px-4 md:px-8">
          <SectionHeading
            eyebrow="Quick answers"
            title="Questions homeowners often ask before getting in touch."
            intro="These are some of the most common questions we receive about pricing, timelines, service areas, renovation scope and how the process works."
          />
          <div className="mt-10">
            <FaqList items={homepageFaqs} />
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {serviceLinks.slice(0, 3).map((service) => (
              <Link key={service.path} to={service.path} className="pill-link">
                {service.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Get a clear quote for your project"
        text="Send through your plans, photos, measurements or rough ideas and we will help map out the joinery scope, pricing direction and best next step without the guesswork."
      />
    </>
  )
}
