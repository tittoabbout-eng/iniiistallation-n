
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import { buildBreadcrumbSchema, buildLocalBusinessSchema } from '../utils/schema'
import { notFoundPageContent } from '../data/site'

export default function NotFound() {
  const content = notFoundPageContent
  const schema = [
    buildLocalBusinessSchema(),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Not found', path: '/404' },
    ]),
  ]

  return (
    <>
      <Seo
        title={content.seoTitle}
        description={content.seoDescription}
        path="/404"
        schema={schema}
        noIndex
      />

      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        image={content.image}
        imageAlt={content.imageAlt}
        actions={
          <>
            <Link to="/" className="btn-primary">
              {content.primaryButtonLabel}
            </Link>
            <Link to="/projects" className="btn-outline border-white text-white hover:bg-white hover:text-navy-950">
              {content.secondaryButtonLabel}
            </Link>
          </>
        }
      />
    </>
  )
}
