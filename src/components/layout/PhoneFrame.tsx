import type { ReactNode } from 'react'

// En desktop centra el prototipo en un "teléfono" de 390×844; en mobile ocupa toda la pantalla.
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full items-center justify-center md:p-8">
      <div className="relative h-full w-full overflow-hidden bg-neutral-50 md:h-[844px] md:w-[390px] md:rounded-[40px] md:shadow-float">
        {children}
      </div>
    </div>
  )
}
