
import { ChevronDown } from 'lucide-react'

type FaqLike = {
  question: string
  answer: string
}

type Props = {
  items: readonly FaqLike[]
}

export default function FaqList({ items }: Props) {
  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-2xl border border-navy-100 bg-white px-5 py-4 shadow-sm"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
            <span className="text-left text-lg font-display font-semibold text-navy-950">
              {item.question}
            </span>
            <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-gold-700 transition-transform group-open:rotate-180" />
          </summary>
          <p className="pt-4 text-sm leading-relaxed text-navy-600 md:text-base">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  )
}
