
import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { siteSettings } from '../data/site'
import { globalContent } from '../data/globalContent'
import { trackEvent } from '../utils/trackEvent'

type Props = {
  title: string
  text: string
}

export default function CtaBanner({ title, text }: Props) {
  return (
    <section className="section-padding bg-gold-500">
      <div className="container-custom px-4 md:px-8">
        <div className="rounded-3xl bg-navy-950 px-6 py-10 text-white shadow-2xl md:px-10 md:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <div>
              <p className="eyebrow text-gold-300">Ready to talk through your project?</p>
              <h2 className="mt-3 text-3xl font-display font-bold md:text-4xl">{title}</h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy-100 md:text-lg">
                {text}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                to="/contact"
                className="btn-primary justify-center"
                onClick={() => trackEvent('cta_click', { location: 'cta_banner', type: 'quote' })}
              >
                {globalContent.cta.primaryLabel} <ArrowRight size={16} />
              </Link>
              <a
                href={siteSettings.phoneHref}
                className="btn-outline justify-center border-white text-white hover:border-gold-500 hover:bg-white hover:text-navy-950"
                onClick={() => trackEvent('cta_click', { location: 'cta_banner', type: 'phone' })}
              >
                <Phone size={16} />
                Call {siteSettings.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
