
type Props = {
  eyebrow?: string
  title: string
  intro?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  className = '',
}: Props) {
  const alignment = align === 'center' ? 'text-center mx-auto' : ''

  return (
    <div className={`max-w-3xl ${alignment} ${className}`.trim()}>
      {eyebrow ? <p className="eyebrow text-gold-700">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl font-display font-bold text-navy-950 md:text-4xl">
        {title}
      </h2>
      {intro ? (
        <p className="mt-4 text-base leading-relaxed text-navy-600 md:text-lg">
          {intro}
        </p>
      ) : null}
    </div>
  )
}
