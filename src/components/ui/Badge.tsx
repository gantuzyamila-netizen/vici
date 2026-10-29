import { cn } from '../../lib/cn'

type Tone = 'solid' | 'discount' | 'shipping'

const tones: Record<Tone, string> = {
  solid: 'bg-brand-orange-500 text-neutral-0',
  discount: 'bg-brand-orange-100 text-brand-orange-700',
  shipping: 'bg-brand-violet-50 text-brand-violet-600',
}

export function Badge({ tone, children }: { tone: Tone; children: string }) {
  return (
    <span className={cn('inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-[10px] py-1 text-label-s', tones[tone])}>
      {children}
    </span>
  )
}
