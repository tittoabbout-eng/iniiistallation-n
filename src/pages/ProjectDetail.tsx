import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import CtaBanner from '../components/CtaBanner'
import PageHero from '../components/PageHero'
import ReviewGrid from '../components/ReviewGrid'
import SectionHeading from '../components/SectionHeading'
import Seo from '../components/Seo'
import SmartImage from '../components/SmartImage'
import { areaPages, getReviewsByIds, projects } from '../data/site'
import { projectContent } from '../data/projectContent'
import {
  buildBreadcrumbSchema,
  buildLocalBusinessSchema,
  buildProjectSchema,
} from '../utils/schema'

type ProjectItem = (typeof projects)[number]

type ProjectImage = { src: string; alt: string; caption: string }

function GallerySection({
  images,
  initialCount,
  gridClassName,
}: {
  images: ProjectImage[]
  initialCount: number
  gridClassName: string
}) {
  const [expanded, setExpanded] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const hasOverflow = images.length > initialCount
  const visibleImages = expanded || !hasOverflow ? images : images.slice(0, initialCount)

  return (
    <>
      <div className={gridClassName}>
        {visibleImages.map((image) => {
          const fullIndex = images.findIndex((item) => item.src === image.src)

          return (
            <figure
              key={image.src}
              className="overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-sm"
            >
              <button
                type="button"
                onClick={() => setActiveIndex(fullIndex)}
                className="block w-full text-left"
                aria-label={`Open larger image view for ${image.alt}`}
              >
                <SmartImage
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </button>
              <figcaption className="p-5 text-sm leading-relaxed text-navy-600">
                {image.caption}
              </figcaption>
            </figure>
          )
        })}
      </div>

      {hasOverflow ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="btn-outline"
          >
            {expanded
              ? 'Show fewer photos'
              : `View ${images.length - initialCount} more photos`}
          </button>
        </div>
      ) : null}

      {activeIndex !== null ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/90 p-4"
          onClick={() => setActiveIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Project image enlarged view"
        >
          <div
            className="relative w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="absolute right-3 top-3 z-10 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-navy-950 shadow-lg"
            >
              Close
            </button>
            <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
              <SmartImage
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                loading="eager"
                decoding="async"
                className="max-h-[80vh] w-full object-contain bg-navy-950"
                sizes="100vw"
              />
              <div className="border-t border-navy-100 bg-white p-5 text-sm leading-relaxed text-navy-600">
                {images[activeIndex].caption}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveIndex((activeIndex - 1 + images.length) % images.length)}
                className="btn-outline bg-white text-navy-950"
              >
                Previous
              </button>
              <p className="text-sm font-medium text-white">
                {activeIndex + 1} / {images.length}
              </p>
              <button
                type="button"
                onClick={() => setActiveIndex((activeIndex + 1) % images.length)}
                className="btn-outline bg-white text-navy-950"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default function ProjectDetail({ project }: { project: ProjectItem }) {
  const relatedReviews = getReviewsByIds(project.reviewIds).slice(0, 1)
  const relatedArea = areaPages.find((area) => area.name.toLowerCase() === project.suburb.toLowerCase())
  const relatedServices = Array.from(new Map(project.spaces.map((space) => [space.servicePath, { path: space.servicePath, label: space.title }])).values())
  const schema = [
    buildLocalBusinessSchema(),
    buildProjectSchema(project),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
      { name: project.shortTitle, path: `/projects/${project.slug}` },
    ]),
  ]

  return (
    <>
      <Seo
        title={`${project.title} | InsideOut Joinery & Renos`}
        description={project.summary}
        path={`/projects/${project.slug}`}
        image={project.heroImage}
        schema={schema}
      />

      <PageHero
        eyebrow={`Project case study · ${project.suburb}`}
        title={project.title}
        description={project.summary}
        image={project.heroImage}
        imageAlt={project.heroAlt}
        actions={
          <>
            <Link to="/contact" className="btn-primary">
              Request a Quote
            </Link>
            <Link to="/projects" className="btn-outline border-white text-white hover:bg-white hover:text-navy-950">
              Back to projects
            </Link>
          </>
        }
      />

      <section className="section-padding bg-white">
        <div className="container-custom px-4 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SectionHeading
                eyebrow={projectContent.detailPage.overviewEyebrow}
                title={projectContent.detailPage.overviewTitle}
                intro={project.overview}
              />
            </div>

            <aside className="rounded-3xl border border-navy-100 bg-navy-50 p-6">
  <h2 className="text-2xl font-display font-semibold text-navy-950">
    {projectContent.detailPage.materialsTitle}
  </h2>
  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-navy-600">
    {project.materials.map((material) => (
      <li key={material}>• {material}</li>
    ))}
  </ul>

  <div className="mt-6 flex flex-wrap gap-3">
    <Link to="/projects" className="pill-link">
      View all projects
    </Link>
    {relatedArea ? (
      <Link to={`/service-areas/${relatedArea.slug}`} className="pill-link">
        {relatedArea.name} area page
      </Link>
    ) : (
      <Link to="/service-areas" className="pill-link">
        Service areas
      </Link>
    )}
    <Link to="/contact" className="pill-link">
      Contact us
    </Link>
  </div>

  {relatedServices.length ? (
    <div className="mt-6 border-t border-navy-200 pt-5">
      <p className="text-sm font-semibold text-navy-950">Related service pages</p>
      <div className="mt-3 flex flex-wrap gap-3">
        {relatedServices.slice(0, 3).map((service) => (
          <Link key={service.path} to={service.path} className="pill-link">
            {service.label}
          </Link>
        ))}
      </div>
    </div>
  ) : null}
</aside>
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy-50">
        <div className="container-custom px-4 md:px-8">
          <SectionHeading
            eyebrow={projectContent.detailPage.finishedSpacesEyebrow}
            title={projectContent.detailPage.finishedSpacesTitle}
            intro={projectContent.detailPage.finishedSpacesIntro}
          />

          <GallerySection
            images={[{ src: project.heroImage, alt: project.heroAlt, caption: project.summary }, ...project.afterImages]}
            initialCount={6}
            gridClassName="mt-12 grid gap-6 lg:grid-cols-2"
          />
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom px-4 md:px-8">
          <SectionHeading
            eyebrow={projectContent.detailPage.beforeEyebrow}
            title={projectContent.detailPage.beforeTitle}
            intro={projectContent.detailPage.beforeIntro}
          />

          <GallerySection
            images={project.beforeImages}
            initialCount={3}
            gridClassName="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          />
        </div>
      </section>

      {project.spaces.length ? (
        <section className="section-padding bg-navy-50">
          <div className="container-custom px-4 md:px-8">
            <SectionHeading
              eyebrow={projectContent.detailPage.spacesEyebrow}
              title={projectContent.detailPage.spacesTitle}
              intro={projectContent.detailPage.spacesIntro}
            />

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {project.spaces.map((space) => (
                <article
                  key={space.title}
                  className="overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-sm"
                >
                  <SmartImage
                    src={space.image}
                    alt={space.alt}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                  <div className="p-6">
                    <h2 className="text-2xl font-display font-semibold text-navy-950">
                      {space.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-navy-600">
                      {space.text}
                    </p>
                    <Link
                      to={space.servicePath}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold-600 transition-colors hover:text-gold-500"
                    >
                      Explore related service <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {relatedReviews.length ? (
        <section className="section-padding bg-white">
          <div className="container-custom px-4 md:px-8">
            <SectionHeading
              eyebrow={projectContent.detailPage.reviewEyebrow}
              title={projectContent.detailPage.reviewTitle}
            />
            <div className="mt-10 max-w-3xl">
              <ReviewGrid items={relatedReviews} />
            </div>
          </div>
        </section>
      ) : null}

     <section className="section-padding bg-white">
  <div className="container-custom px-4 md:px-8">
    <div className="rounded-3xl border border-navy-100 bg-navy-50 p-8 md:p-10">
      <SectionHeading
        eyebrow={projectContent.detailPage.outcomeEyebrow}
        title={projectContent.detailPage.outcomeTitle}
        intro={project.outcome}
      />

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/projects" className="pill-link">
          View more projects
        </Link>
        <Link to="/service-areas" className="pill-link">
          Browse service areas
        </Link>
        <Link to="/contact" className="pill-link">
          Request a quote
        </Link>
      </div>
    </div>
  </div>
</section>

      <CtaBanner title={project.ctaText} text={projectContent.detailPage.ctaText} />
    </>
  )
}
