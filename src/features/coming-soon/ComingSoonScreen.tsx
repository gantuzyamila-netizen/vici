export function ComingSoonScreen({ title }: { title: string }) {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-1 bg-neutral-50 px-6 text-center">
      <h1 className="text-title-m text-neutral-900">{title}</h1>
      <p className="text-body-m text-neutral-500">Esta pantalla todavía no está diseñada.</p>
    </main>
  )
}
