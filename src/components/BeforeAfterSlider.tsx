import { useState } from 'react'
import SmartImage from './SmartImage'

type Props = {
  before: string
  after: string
  beforeAlt: string
  afterAlt: string
  className?: string
}

export default function BeforeAfterSlider({ before, after, beforeAlt, afterAlt, className = '' }: Props) {
  const [position, setPosition] = useState(58)

  const handleMove = (value: number) => {
    const safe = Math.min(100, Math.max(0, value))
    setPosition(safe)
  }

  return (
    <div className={`relative overflow-hidden rounded-sm border border-navy-100 bg-white shadow-xl ${className}`}>
      <div className="relative aspect-[4/3] md:aspect-[5/4] select-none">
        <SmartImage src={before} alt={beforeAlt} loading="lazy" decoding="async" sizes="(min-width: 1024px) 50vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
          <SmartImage src={after} alt={afterAlt} loading="lazy" decoding="async" sizes="(min-width: 1024px) 50vw, 100vw" className="h-full w-full object-cover" />
        </div>

        <div className="absolute inset-y-0 z-10" style={{ left: `${position}%`, transform: 'translateX(-50%)' }}>
          <div className="h-full w-0.5 bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" />
          <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-navy-950 text-white shadow-lg">
            <span className="text-xs font-bold">↔</span>
          </div>
        </div>

        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-navy-950">After</div>
        <div className="absolute right-4 top-4 rounded-full bg-navy-950/85 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">Before</div>
      </div>

      <div className="border-t border-navy-100 bg-white px-4 py-3">
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(e) => handleMove(Number(e.target.value))}
          className="before-after-range h-2 w-full cursor-pointer appearance-none rounded-full bg-navy-100"
          aria-label="Compare before and after images"
        />
      </div>
    </div>
  )
}
