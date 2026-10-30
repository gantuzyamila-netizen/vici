export function Greeting({ name }: { name: string }) {
  return (
    <div className="flex flex-col gap-1 px-6">
      <h1 className="text-display-xl text-neutral-900">¡Hola, {name}!</h1>
      <p className="text-[16px] leading-5 text-neutral-500">¿Qué querés comer hoy?</p>
    </div>
  )
}
