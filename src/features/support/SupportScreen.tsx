import { motion } from 'framer-motion'
import { useState } from 'react'
import { Icon, MaskIcon } from '../../components/icons/Icon'
import { CircleButton } from '../../components/ui/CircleButton'
import { faqs } from '../../data/faqs'
import { useBack } from '../../hooks/useBack'

// Soporte (Figma node 96:15763). El buscador filtra las preguntas; todavía no hay pantalla de respuesta, así que quedan deshabilitadas.
export function SupportScreen() {
  const goBack = useBack('/home')
  const [query, setQuery] = useState('')
  const text = query.trim().toLowerCase()
  const visible = faqs.filter((question) => !text || question.toLowerCase().includes(text))

  return (
    <main className="no-scrollbar flex h-full flex-col overflow-y-auto bg-neutral-50 pb-[124px] pt-16 [&>*]:shrink-0">
      <header className="mb-3 flex items-center gap-[14px] px-6">
        <CircleButton icon="back" label="Volver" onClick={goBack} />
        <h1 className="min-w-0 flex-1 text-title-m text-neutral-900">Soporte</h1>
      </header>

      <section className="flex flex-col gap-4 px-6 pb-4 pt-6">
        <h2 className="w-full text-[20px] font-bold leading-8 text-neutral-900">¿Cómo te podemos ayudar?</h2>
        <label className="flex h-12 items-center gap-3 rounded-xl border border-brand-violet-200 bg-neutral-0 px-4 transition-colors focus-within:border-brand-violet-600">
          <Icon name="search-24" size={24} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscá una consulta..."
            className="min-w-0 flex-1 bg-transparent text-body-m text-neutral-900 outline-none placeholder:text-neutral-500"
          />
        </label>
      </section>

      <div className="flex flex-col gap-3 px-6 pb-6 pt-6">
        {visible.map((question) => (
          <motion.button
            key={question}
            type="button"
            layout
            disabled
            className="flex w-full cursor-not-allowed items-center gap-3 rounded-[20px] bg-neutral-0 p-4 text-left opacity-disabled shadow-card"
          >
            <span className="min-w-0 flex-1 text-[14px] font-medium leading-5 text-neutral-900">{question}</span>
            <MaskIcon name="expand-right" size={24} className="text-brand-violet-600" />
          </motion.button>
        ))}
        {visible.length === 0 && <p className="py-6 text-center text-body-m text-neutral-500">No encontramos esa consulta.</p>}
      </div>
    </main>
  )
}
