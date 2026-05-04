
import { Link } from 'react-router-dom'
import { Clock3, Mail, MapPin, Phone, Star } from 'lucide-react'
import {
  footerSuburbLinks,
  primaryNavigation,
  serviceLinks,
  siteSettings,
} from '../data/site'
import { globalContent } from '../data/globalContent'

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-custom px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.9fr]">
          <div>
            <img
              src="/logo.png"
              alt="InsideOut Joinery & Renovations"
              className="h-10 w-auto brightness-0 invert"
              width="200"
              height="97"
            />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-navy-200">
              {globalContent.brand.footerIntro}
            </p>

            <div className="mt-6 space-y-3 text-sm text-navy-100">
              <p className="inline-flex items-start gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-gold-400" />
                <a href={siteSettings.phoneHref} className="font-semibold hover:text-gold-300">
                  {siteSettings.phone}
                </a>
              </p>
              <p className="inline-flex items-start gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-gold-400" />
                <a href={siteSettings.emailHref} className="hover:text-gold-300">
                  {siteSettings.email}
                </a>
              </p>
              <p className="inline-flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold-400" />
                <span>{siteSettings.baseLocation}</span>
              </p>
              <p className="inline-flex items-start gap-3">
                <Clock3 size={16} className="mt-0.5 shrink-0 text-gold-400" />
                <span>{siteSettings.hoursSummary}</span>
              </p>
            </div>

            <a
              href={siteSettings.googleReviewsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-gold-200 transition-colors hover:border-gold-500 hover:text-gold-100"
            >
              <Star size={16} />
              {globalContent.cta.reviewButtonLabel}
            </a>
          </div>

          <div>
            <h2 className="text-lg font-display font-semibold text-white">Explore</h2>
            <ul className="mt-4 space-y-3 text-sm text-navy-200">
              {primaryNavigation.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="transition-colors hover:text-gold-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-display font-semibold text-white">Services</h2>
            <ul className="mt-4 space-y-3 text-sm text-navy-200">
              {serviceLinks.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="transition-colors hover:text-gold-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-display font-semibold text-white">Key suburbs</h2>
            <ul className="mt-4 space-y-3 text-sm text-navy-200">
              {footerSuburbLinks.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="transition-colors hover:text-gold-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-navy-400">
              ABN {siteSettings.abn}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-custom flex flex-col gap-3 px-4 py-5 text-sm text-navy-300 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} {siteSettings.name}. All rights reserved.</p>
          <p>{globalContent.brand.footerBottomText}</p>
        </div>
      </div>
    </footer>
  )
}
