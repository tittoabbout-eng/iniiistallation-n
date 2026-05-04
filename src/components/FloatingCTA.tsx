
import { Link } from 'react-router-dom'
import { MessageSquareQuote, Phone } from 'lucide-react'
import { siteSettings } from '../data/site'
import { globalContent } from '../data/globalContent'
import { trackEvent } from '../utils/trackEvent'

export default function FloatingCTA() {
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-navy-200 bg-white/95 p-3 shadow-[0_-8px_30px_rgba(16,42,67,0.12)] backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-xl grid-cols-2 gap-3">
          <a
            href={siteSettings.phoneHref}
            className="btn-outline justify-center"
            onClick={() => trackEvent('cta_click', { location: 'floating_cta_mobile', type: 'phone' })}
          >
            <Phone size={16} />
            Call
          </a>
          <Link
            to="/contact"
            className="btn-primary justify-center"
            onClick={() => trackEvent('cta_click', { location: 'floating_cta_mobile', type: 'quote' })}
          >
            <MessageSquareQuote size={16} />
            Quote
          </Link>
        </div>
      </div>

      <div className="pointer-events-none fixed bottom-6 right-6 z-40 hidden md:block">
        <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-navy-200 bg-white p-2 shadow-2xl">
          <a
            href={siteSettings.phoneHref}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-navy-950 transition-colors hover:bg-navy-50"
            onClick={() => trackEvent('cta_click', { location: 'floating_cta_desktop', type: 'phone' })}
          >
            <Phone size={16} className="text-gold-600" />
            {siteSettings.phone}
          </a>
          <Link
            to="/contact"
            className="btn-primary rounded-full"
            onClick={() => trackEvent('cta_click', { location: 'floating_cta_desktop', type: 'quote' })}
          >
            {globalContent.cta.primaryLabel}
          </Link>
        </div>
      </div>
    </>
  )
}
