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
import { useScrollReveal } from '../hooks/useScrollReveal'
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
  useScrollReveal()
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
        video="/hero.mp4"
        videoPoster="/hero-poster.jpg"
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
              <CheckCircle2 size={18} className="shrink-0 text-gold-600" />
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
            {services.map((service, i) => (
              <article
                key={service.slug}
                className={`reveal reveal-delay-${Math.min(i + 1, 6)} img-zoom group overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl`}
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
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-600 transition-colors hover:text-gold-500"
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
            {featuredProjectCards.map((project, i) => (
              <article
                key={project.path}
                className={`reveal reveal-delay-${Math.min(i + 1, 3)} img-zoom overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl`}
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
                  <p className="eyebrow text-gold-600">{project.suburb}</p>
                  <h2 className="mt-3 text-2xl font-display font-semibold text-navy-950">
                    {project.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-navy-600">
                    {project.summary}
                  </p>
                  <Link
                    to={project.path}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-600 transition-colors hover:text-gold-500"
                  >
                    View full project page <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works — 5-step process timeline */}
      <section className="section-padding bg-navy-950 relative overflow-hidden">
        {/* Subtle radial glow behind heading */}
        <div className="pointer-events-none absolute inset-0 flex items-start justify-center">
          <div className="h-[500px] w-[700px] rounded-full bg-gold-500/5 blur-[120px]" />
        </div>
        <div className="container-custom relative px-4 md:px-8">
          {/* Heading */}
          <div className="max-w-2xl">
            <p className="eyebrow text-gold-500">Our process</p>
            <h2 className="mt-3 text-3xl font-display font-bold text-white md:text-4xl lg:text-5xl">
              No guesswork. Just a clear path from brief to build.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/60 md:text-lg">
              Every InsideOut project follows the same structured approach — so you know exactly what to expect, when, and why.
            </p>
          </div>

          {/* Steps — desktop: horizontal timeline row; mobile: vertical stack */}
          <div className="mt-14 hidden md:block">
            {/* Connector line */}
            <div className="relative flex items-start justify-between gap-0">
              <div className="absolute left-0 right-0 top-[22px] h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
              {[
                {
                  num: '01',
                  title: 'Get in Touch',
                  desc: 'Send photos, plans or a rough brief. We respond the same day — no commitment, no pressure.',
                },
                {
                  num: '02',
                  title: 'Site Consultation',
                  desc: "We come to you. Measure the space, understand your brief and talk through what's genuinely possible.",
                },
                {
                  num: '03',
                  title: 'Quote & Scope',
                  desc: 'A detailed, fixed quote — materials, timeline and inclusions fully itemised. No vague estimates.',
                },
                {
                  num: '04',
                  title: 'We Build',
                  desc: 'Custom joinery built and installed by our own team. No subcontracting the critical work.',
                },
                {
                  num: '05',
                  title: 'Handover',
                  desc: "Final walkthrough together. We only sign off when every detail meets the standard you paid for.",
                },
              ].map((step, i) => (
                <article key={step.num} className={`reveal reveal-delay-${Math.min(i + 1, 5)} relative flex-1 px-4 first:pl-0 last:pr-0`}>
                  {/* Step number badge with dot on line */}
                  <div className="relative z-10 mb-5 flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-500 text-sm font-bold text-navy-950">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-base font-display font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{step.desc}</p>
                </article>
              ))}
            </div>
          </div>

          {/* Mobile: vertical stack with left gold border */}
          <div className="mt-10 flex flex-col gap-0 md:hidden">
            <div className="relative border-l border-gold-500/30 pl-6">
              {[
                {
                  num: '01',
                  title: 'Get in Touch',
                  desc: 'Send photos, plans or a rough brief. We respond the same day — no commitment, no pressure.',
                },
                {
                  num: '02',
                  title: 'Site Consultation',
                  desc: "We come to you. Measure the space, understand your brief and talk through what's genuinely possible.",
                },
                {
                  num: '03',
                  title: 'Quote & Scope',
                  desc: 'A detailed, fixed quote — materials, timeline and inclusions fully itemised. No vague estimates.',
                },
                {
                  num: '04',
                  title: 'We Build',
                  desc: 'Custom joinery built and installed by our own team. No subcontracting the critical work.',
                },
                {
                  num: '05',
                  title: 'Handover',
                  desc: "Final walkthrough together. We only sign off when every detail meets the standard you paid for.",
                },
              ].map((step) => (
                <div key={step.num} className="relative mb-8 last:mb-0">
                  {/* Dot on border */}
                  <div className="absolute -left-[25px] top-1 h-3 w-3 rounded-full bg-gold-500" />
                  <span className="text-xs font-bold tracking-widest text-gold-500">{step.num}</span>
                  <h3 className="mt-1 text-base font-display font-semibold text-white">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/55">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="btn-primary"
              onClick={() => trackEvent('cta_click', { location: 'process', type: 'start_project' })}
            >
              Start your project
            </Link>
            <span className="text-sm text-white/40">Free on-site consultation — Sydney wide</span>
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
              <p className="eyebrow text-gold-600">{homeSections.beforeAfterTeaser.eyebrow}</p>
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
              <Link to="/service-areas" className="font-semibold text-gold-600 hover:text-gold-500">
                service areas page
              </Link>{' '}
              or jump straight into suburb pages for{' '}
              {highlightedAreas.map((area, index) => (
                <span key={area.path}>
                  <Link
                    to={area.path}
                    className="font-semibold text-gold-600 hover:text-gold-500"
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
                  <Link to={service.path} className="font-semibold text-gold-600 hover:text-gold-500">
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

      {/* Trusted Suppliers / Partner Logo Strip */}
      <section className="border-y border-white/10 bg-navy-950 py-10">
        <div className="container-custom px-4 md:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
            We specify &amp; install from Australia's leading joinery material suppliers
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16">

            {/* Blum — orange square brand mark + wordmark */}
            <div className="flex items-center gap-2 opacity-60 transition-opacity hover:opacity-90">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-sm bg-[#ff671f]">
                <span className="text-[9px] font-black text-white">B</span>
              </div>
              <span className="text-lg font-black tracking-widest text-white">blum</span>
            </div>

            {/* Polytec */}
            <span className="text-lg font-black tracking-widest text-white opacity-60 transition-opacity hover:opacity-90">
              poly<span className="font-light">tec</span>
            </span>

            {/* Laminex */}
            <span className="text-lg font-black tracking-widest text-white opacity-60 transition-opacity hover:opacity-90">
              LAMINEX
            </span>

            {/* Caesarstone */}
            <span className="text-sm font-light tracking-[0.3em] text-white opacity-50 transition-opacity hover:opacity-80 uppercase">
              Caesarstone
            </span>

            {/* Acstone */}
            <span className="text-lg font-black tracking-widest text-white opacity-60 transition-opacity hover:opacity-90">
              AC STONE
            </span>

            {/* Hettich — coloured bar mark + wordmark */}
            <div className="flex items-center gap-2 opacity-60 transition-opacity hover:opacity-90">
              <div className="flex h-6 gap-[2px]">
                <div className="w-[4px] rounded-sm bg-[#00569d]" />
                <div className="w-[4px] rounded-sm bg-[#00965f]" />
                <div className="w-[4px] rounded-sm bg-[#fab900]" />
                <div className="w-[4px] rounded-sm bg-[#e20613]" />
              </div>
              <span className="text-lg font-bold tracking-wider text-white">hettich</span>
            </div>

          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="section-padding bg-navy-50">
        <div className="container-custom px-4 md:px-8">
          {/* Premium star rating badge — above heading */}
          <div className="mb-10 flex justify-center">
            <a
              href="https://www.google.com/maps/place/InsideOut+Joinery+%26+Renos"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full border border-gold-500/30 bg-white px-6 py-3 shadow-sm transition-all hover:border-gold-500/60 hover:shadow-md"
              onClick={() => trackEvent('cta_click', { location: 'reviews', type: 'google_reviews' })}
            >
              {/* Stars SVG — consistent cross-browser */}
              <span className="flex gap-0.5" aria-label="5 stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-4 w-4 fill-gold-500" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </span>
              <span className="text-sm font-bold text-navy-950">4.9</span>
              <span className="h-4 w-px bg-navy-200" />
              <span className="text-sm font-medium text-navy-600">Verified Google reviews</span>
              <svg className="h-4 w-4 text-navy-400 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

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
