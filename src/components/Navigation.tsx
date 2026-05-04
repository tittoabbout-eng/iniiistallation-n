import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, Phone, X } from 'lucide-react'
import { primaryNavigation, services, siteSettings } from '../data/site'
import { globalContent } from '../data/globalContent'
import { trackEvent } from '../utils/trackEvent'

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setMobileOpen(false)
    setMobileServicesOpen(false)
  }, [pathname])

  const isActive = (path: string) => pathname === path
  const isServiceActive = services.some((service) => pathname === `/${service.slug}`)

  const desktopNavItems = primaryNavigation.filter(
    (item) => item.path === '/' || item.path === '/projects' || item.path === '/service-areas',
  )

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-navy-950 text-white">
        <div className="container-custom flex items-center justify-between gap-4 px-4 py-2 text-xs md:px-8 md:text-sm">
          <p className="truncate font-medium text-navy-100">
            {globalContent.brand.topBarText}
          </p>
          <a
            href={siteSettings.phoneHref}
            className="inline-flex shrink-0 items-center gap-2 font-bold text-gold-400 transition-colors hover:text-gold-300"
            onClick={() => trackEvent('cta_click', { location: 'nav_topbar', type: 'phone' })}
          >
            <Phone size={14} />
            {siteSettings.phone}
          </a>
        </div>
      </div>

      <nav className="border-b border-white/10 bg-navy-950/95 backdrop-blur">
        <div className="container-custom flex items-center justify-between gap-6 px-4 py-4 md:px-8">
          <Link to="/" className="min-w-0 shrink-0">
            <img
              src="/logo.png"
              alt="InsideOut Joinery & Renovations"
              className="h-10 w-auto md:h-12"
              width="240"
              height="116"
            />
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {desktopNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'text-gold-400' : 'text-white hover:text-gold-300'}`}
              >
                {item.label}
              </Link>
            ))}

            <div className="group relative">
              <button
                className={`nav-link inline-flex items-center gap-1 ${isServiceActive ? 'text-gold-400' : 'text-white hover:text-gold-300'}`}
                type="button"
              >
                Services <ChevronDown size={14} />
              </button>

              <div className="pointer-events-none absolute left-0 top-full pt-4 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                <div className="w-80 rounded-2xl border border-navy-800 bg-white p-3 shadow-2xl">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      to={`/${service.slug}`}
                      className="block rounded-xl px-4 py-3 transition-colors hover:bg-navy-50"
                    >
                      <span className="block text-sm font-display font-semibold text-navy-950">
                        {service.title}
                      </span>
                      <span className="mt-1 block text-sm text-navy-600">
                        {service.navLabel}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/blog"
              className={`nav-link ${isActive('/blog') ? 'text-gold-400' : 'text-white hover:text-gold-300'}`}
            >
              Blog
            </Link>

            <Link
              to="/contact"
              className={`nav-link ${isActive('/contact') ? 'text-gold-400' : 'text-white hover:text-gold-300'}`}
            >
              Contact
            </Link>

            <Link
              to="/contact"
              className="btn-primary"
              onClick={() => trackEvent('cta_click', { location: 'nav_desktop', type: 'quote' })}
            >
              {globalContent.cta.primaryLabel}
            </Link>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <a
              href={siteSettings.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-gold-300/30 px-3 py-2 text-sm font-semibold text-gold-200"
              onClick={() => trackEvent('cta_click', { location: 'nav_mobile_header', type: 'phone' })}
            >
              <Phone size={16} />
              <span className="hidden sm:inline">{siteSettings.phone}</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className="border-t border-white/10 bg-navy-950 lg:hidden">
            <div className="container-custom px-4 py-5 md:px-8">
              <div className="space-y-2 rounded-3xl bg-white/5 p-3">
                {desktopNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block rounded-2xl px-4 py-3 text-sm font-semibold ${isActive(item.path) ? 'bg-gold-500 text-navy-950' : 'text-white hover:bg-white/5'}`}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="rounded-2xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((open) => !open)}
                    className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-white"
                  >
                    Services
                    <ChevronDown
                      size={18}
                      className={`transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {mobileServicesOpen ? (
                    <div className="space-y-1 border-t border-white/10 px-2 py-2">
                      {services.map((service) => (
                        <Link
                          key={service.slug}
                          to={`/${service.slug}`}
                          className={`block rounded-xl px-3 py-3 text-sm ${pathname === `/${service.slug}` ? 'bg-white text-navy-950' : 'text-navy-100 hover:bg-white/10'}`}
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>

                <Link
                  to="/blog"
                  className={`block rounded-2xl px-4 py-3 text-sm font-semibold ${isActive('/blog') ? 'bg-gold-500 text-navy-950' : 'text-white hover:bg-white/5'}`}
                >
                  Blog
                </Link>

                <Link
                  to="/contact"
                  className={`block rounded-2xl px-4 py-3 text-sm font-semibold ${isActive('/contact') ? 'bg-gold-500 text-navy-950' : 'text-white hover:bg-white/5'}`}
                >
                  Contact
                </Link>

                <div className="grid gap-2 pt-2 sm:grid-cols-2">
                  <a
                    href={siteSettings.phoneHref}
                    className="btn-outline justify-center border-white text-white hover:bg-white hover:text-navy-950"
                    onClick={() => trackEvent('cta_click', { location: 'nav_mobile_menu', type: 'phone' })}
                  >
                    Call us
                  </a>
                  <Link
                    to="/contact"
                    className="btn-primary justify-center"
                    onClick={() => trackEvent('cta_click', { location: 'nav_mobile_menu', type: 'quote' })}
                  >
                    Request a quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  )
}
