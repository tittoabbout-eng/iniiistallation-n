import type { ReactNode } from 'react'
import SmartImage from './SmartImage'

type Props = {
  eyebrow: string
  title: string
  description: string
  image: string
  imageAlt: string
  video?: string
  videoPoster?: string
  actions?: ReactNode
}

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  video,
  videoPoster,
  actions,
}: Props) {
  return (
    <section className="relative isolate overflow-hidden pt-[116px]">
      <div className="absolute inset-0">
        {video ? (
          <>
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster={videoPoster}
              className="h-full w-full object-cover hidden md:block"
              aria-hidden="true"
            >
              <source src={video} type="video/mp4" />
            </video>
            <SmartImage
              src={videoPoster ?? image}
              alt={imageAlt}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              sizes="100vw"
              className="h-full w-full object-cover md:hidden"
            />
          </>
        ) : (
          <SmartImage
            src={image}
            alt={imageAlt}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            sizes="100vw"
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(16,42,67,0.85),rgba(16,42,67,0.65),rgba(16,42,67,0.4))]" />
      </div>
      <div className="container-custom relative z-10 px-4 py-24 md:px-8 md:py-28 lg:py-32">
        <div className="max-w-3xl">
          <p className="eyebrow text-gold-300">{eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-display font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-navy-100 md:text-lg">
            {description}
          </p>
          {actions ? <div className="mt-8 flex flex-wrap gap-4">{actions}</div> : null}
        </div>
      </div>
    </section>
  )
}
