export function Greeting({ name }: { name: string }) {
  return (
    <div className="flex flex-col gap-0.5 px-6">
      <h1 className="text-display-xl text-neutral-900">¡Hola, {name}!</h1>
      <p className="text-body-m text-neutral-500">¿Qué querés comer hoy?</p>
    </div>
  )
}
