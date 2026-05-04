import { useState } from 'react'
import { AlertCircle, Clock3, Mail, MapPin, Phone, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import {
  projects,
  services,
  siteSettings,
} from '../data/site'
import {
  buildBreadcrumbSchema,
  buildLocalBusinessSchema,
} from '../utils/schema'
import { trackEvent } from '../utils/trackEvent'

type SiteSettingsWithSecondaryEmail = typeof siteSettings & {
  secondaryEmail?: string
  secondaryEmailHref?: string
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)

  const settings = siteSettings as SiteSettingsWithSecondaryEmail
  const secondaryEmail = settings.secondaryEmail?.trim()
  const secondaryEmailHref = settings.secondaryEmailHref?.trim()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setError(false)

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('/', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setSubmitted(true)
        form.reset()
        trackEvent('form_submit', { form_name: 'contact_quote' })
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setSubmitting(false)
    }
  }

  const schema = [
    buildLocalBusinessSchema(),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ]),
  ]

  return (
    <>
      <Seo
        title="Contact | InsideOut Joinery & Renos"
        description="Get in touch with InsideOut Joinery & Renos for custom kitchens, wardrobes, laundries, bespoke joinery and joinery-led renovation projects across Sydney."
        path="/contact"
        image="/willoughby/willoughby-kitchen-hero.jpg"
        schema={schema}
      />

      <PageHero
        eyebrow="Contact"
        title="Start your quote request"
        description="Send plans, measurements, inspiration images or site photos. The more detail you share, the better we can guide the next step and prepare your quote."
        image="/epping/epping-kitchenette.jpg"
        imageAlt="InsideOut Joinery & Renos kitchen project"
        actions={
          <>
            <a
              href={siteSettings.phoneHref}
              className="btn-outline border-white text-white hover:bg-white hover:text-navy-950"
              onClick={() => trackEvent('cta_click', { location: 'contact_hero', type: 'phone' })}
            >
              <Phone size={16} />
              Call {siteSettings.phone}
            </a>

            <a
              href="#quote-form"
              className="btn-primary bg-gold-400 text-navy-950 hover:bg-gold-300"
              onClick={() => trackEvent('cta_click', { location: 'contact_hero', type: 'scroll_to_form' })}
            >
              Fill out form
            </a>
          </>
        }
      />

      <section className="section-padding bg-white">
        <div className="container-custom px-4 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div id="quote-form" className="scroll-mt-32 rounded-3xl border border-navy-100 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-3xl font-display font-bold text-navy-950">
                Request a free quote
              </h2>
              <p className="mt-4 text-base leading-relaxed text-navy-600">
                Tell us which rooms are involved, what stage the project is at and any finish or storage priorities. Fill out the form below and we will review the details before guiding you on the next step.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-gold-200 bg-gold-50 p-5">
                  <p className="text-sm font-semibold text-navy-950">Helpful to include</p>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">
                    Plans, rough measurements, inspiration images, room photos, your suburb and the rooms involved. Quotes are tailored to the actual scope, finish level and site conditions.
                  </p>
                </div>
                <div className="rounded-2xl border border-navy-100 bg-navy-50 p-5">
                  <p className="text-sm font-semibold text-navy-950">What happens next</p>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">
                    We review the scope, confirm whether a call or site discussion is the right next move, and then come back with clearer direction on pricing and timing.
                  </p>
                </div>
              </div>

              {submitted ? (
                <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
                  <p className="text-lg font-display font-semibold text-navy-950">
                    Thanks — your enquiry has been sent.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">
                    We will be in touch as soon as we can. If your project is urgent,
                    you can also call {siteSettings.phone}.
                  </p>
                </div>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  encType="multipart/form-data"
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-5"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <input type="hidden" name="bot-field" />

                  {error ? (
                    <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                      <AlertCircle size={18} className="mt-0.5 shrink-0" />
                      <span>
                        Something went wrong while sending your enquiry. Please try again
                        or call us directly on {siteSettings.phone}.
                      </span>
                    </div>
                  ) : null}

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="form-label" htmlFor="firstName">
                        First name *
                      </label>
                      <input id="firstName" name="firstName" required className="form-input" />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="lastName">
                        Last name *
                      </label>
                      <input id="lastName" name="lastName" required className="form-input" />
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="form-label" htmlFor="email">
                        Email *
                      </label>
                      <input id="email" name="email" type="email" required className="form-input" />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="phone">
                        Phone *
                      </label>
                      <input id="phone" name="phone" type="tel" required className="form-input" />
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="form-label" htmlFor="suburb">
                        Suburb
                      </label>
                      <input
                        id="suburb"
                        name="suburb"
                        className="form-input"
                        placeholder="e.g. Mosman, Willoughby, Coogee"
                      />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="service">
                        Service required *
                      </label>
                      <select id="service" name="service" required className="form-input">
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service.slug} value={service.slug}>
                            {service.title}
                          </option>
                        ))}
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="form-label" htmlFor="projectFile">
                      Attach plans or photos
                    </label>
                    <input
                      id="projectFile"
                      name="projectFile"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      className="form-input file:mr-4 file:rounded-full file:border-0 file:bg-gold-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-navy-950"
                    />
                    <p className="mt-2 text-xs text-navy-500">
                      Optional. PDF, JPG, PNG, DOC or DOCX.
                    </p>
                  </div>

                  <div>
                    <label className="form-label" htmlFor="message">
                      Tell us about your project *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="form-input min-h-[160px] resize-y"
                      placeholder="Which rooms are involved, what style or finish are you aiming for, and do you have any timing constraints?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Send size={16} />
                    {submitting ? 'Sending...' : 'Send enquiry'}
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl bg-navy-950 p-6 text-white shadow-sm md:p-8">
                <h2 className="text-2xl font-display font-bold">Contact details</h2>
                <div className="mt-6 space-y-5 text-sm">
                  <p className="flex items-start gap-3">
                    <Phone size={17} className="mt-0.5 shrink-0 text-gold-300" />
                    <a
                      href={siteSettings.phoneHref}
                      className="font-semibold hover:text-gold-200"
                      onClick={() => trackEvent('cta_click', { location: 'contact_sidebar', type: 'phone' })}
                    >
                      {siteSettings.phone}
                    </a>
                  </p>

                  <div className="flex items-start gap-3">
                    <Mail size={17} className="mt-0.5 shrink-0 text-gold-300" />
                    <div className="space-y-1">
                      <a href={siteSettings.emailHref} className="block hover:text-gold-200">
                        {siteSettings.email}
                      </a>

                      {secondaryEmail && secondaryEmailHref ? (
                        <a href={secondaryEmailHref} className="block hover:text-gold-200">
                          {secondaryEmail}
                        </a>
                      ) : null}
                    </div>
                  </div>

                  <p className="flex items-start gap-3">
                    <MapPin size={17} className="mt-0.5 shrink-0 text-gold-300" />
                    <span>{siteSettings.baseLocation}</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <Clock3 size={17} className="mt-0.5 shrink-0 text-gold-300" />
                    <span>
                      {siteSettings.hoursDetail[0]}
                      <br />
                      {siteSettings.hoursDetail[1]}
                    </span>
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-navy-100 bg-navy-50 p-6">
                <h2 className="text-2xl font-display font-semibold text-navy-950">
                  Useful starting points
                </h2>
                <div className="mt-5 flex flex-wrap gap-3">
                  {services.map((service) => (
                    <Link key={service.slug} to={`/${service.slug}`} className="pill-link">
                      {service.title}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-navy-100 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-display font-semibold text-navy-950">
                  Recent project pages
                </h2>
                <ul className="mt-4 space-y-3 text-sm text-navy-600">
                  {projects.slice(0, 8).map((project) => (
                    <li key={project.slug}>
                      <Link
                        to={`/projects/${project.slug}`}
                        className="font-semibold text-gold-600 hover:text-gold-500"
                      >
                        {project.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
