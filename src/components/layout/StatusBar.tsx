import { cn } from '../../lib/cn'

interface StatusBarProps {
  tone: 'dark' | 'light'
  withBackground: boolean
}

const icons = [
  { name: 'signal', w: 18 },
  { name: 'wifi', w: 16 },
  { name: 'battery', w: 27 },
]

export function StatusBar({ tone, withBackground }: StatusBarProps) {
  const suffix = tone === 'light' ? '-light' : ''
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-7 pb-1 pt-4 transition-colors duration-300',
        withBackground ? 'bg-neutral-50' : 'bg-transparent',
        tone === 'light' ? 'text-neutral-0' : 'text-neutral-900',
      )}
    >
      <span className="text-label-l">9:41</span>
      <div className="flex items-center gap-[6px]">
        {icons.map((icon) => (
          <img key={icon.name} src={`/icons/status/${icon.name}${suffix}.svg`} width={icon.w} height={12} alt="" className="block" />
        ))}
      </div>
    </div>
  )
}
