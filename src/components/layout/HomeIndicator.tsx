import { cn } from '../../lib/cn'

export function HomeIndicator({ tone }: { tone: 'dark' | 'light' }) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute left-1/2 top-[831px] z-40 h-[5px] w-[134px] -translate-x-1/2 rounded-[3px] transition-colors duration-300',
        tone === 'light' ? 'bg-neutral-0' : 'bg-neutral-900',
      )}
    />
  )
}
