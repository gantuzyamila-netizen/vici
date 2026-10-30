import { cn } from '../../lib/cn'

export function HomeIndicator({ tone }: { tone: 'dark' | 'light' }) {
  return (
    <div
      className={cn(
        // en mobile el teléfono ya tiene el suyo: solo se dibuja dentro del marco de desktop
        'pointer-events-none absolute bottom-2 left-1/2 z-40 hidden md:block h-[5px] w-[134px] -translate-x-1/2 rounded-[3px] transition-colors duration-300',
        tone === 'light' ? 'bg-neutral-0' : 'bg-neutral-900',
      )}
    />
  )
}
