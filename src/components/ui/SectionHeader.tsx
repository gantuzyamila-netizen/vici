export function SectionHeader({ title, actionLabel, onAction }: { title: string; actionLabel: string; onAction?: () => void }) {
  return (
    <div className="flex items-center justify-between px-6">
      <h2 className="text-title-m text-neutral-900">{title}</h2>
      <button type="button" onClick={onAction} className="text-label-m text-brand-violet-600 active:opacity-60">
        {actionLabel}
      </button>
    </div>
  )
}
