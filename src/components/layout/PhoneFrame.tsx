import type { ReactNode } from 'react'

// En desktop centra el prototipo en un "teléfono" de 390×844; en mobile ocupa toda la pantalla visible (100dvh: sin cortarse detrás de la barra del navegador).
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 h-dvh md:static md:flex md:h-full md:min-h-[calc(844px+4rem)] md:items-center md:justify-center md:p-8">
      <div className="relative h-full w-full overflow-hidden bg-neutral-50 md:h-[844px] md:w-[390px] md:rounded-[32px] md:shadow-float">
        {children}
      </div>
    </div>
  )
}
