
type ReviewLike = {
  id: string
  name: string
  source: string
  quote: string
  context: string
}

type Props = {
  items: readonly ReviewLike[]
}

export default function ReviewGrid({ items }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((review) => (
        <article
          key={review.id}
          className="flex h-full flex-col rounded-3xl border border-navy-100 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center gap-1 text-gold-600" aria-hidden="true">
            {'★★★★★'.split('').map((star, index) => (
              <span key={`${review.id}-${index}`}>{star}</span>
            ))}
          </div>
          <blockquote className="mt-4 flex-1 text-base leading-relaxed text-navy-700">
            “{review.quote}”
          </blockquote>
          <div className="mt-5 border-t border-navy-100 pt-4">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-navy-950">
              {review.name}
            </p>
            <p className="mt-1 text-sm text-navy-500">
              {review.context} · {review.source}
            </p>
          </div>
        </article>
      ))}
    </div>
  )
}
