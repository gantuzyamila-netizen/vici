import { forwardRef } from 'react'
import { Icon } from '../icons/Icon'

interface SearchBarProps {
  placeholder: string
  value: string
  onChange: (value: string) => void
  onFocus?: () => void
}

// search de Figma: 56 de alto, radio 28, sombra Card. Es un input real: al tocarlo se abre el teclado.
export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(function SearchBar({ placeholder, value, onChange, onFocus }, ref) {
  return (
    <label className="flex h-14 min-w-0 flex-1 cursor-text items-center gap-3 rounded-[28px] bg-neutral-0 pl-5 pr-4 shadow-card">
      <Icon name="search" size={20} />
      <input
        ref={ref}
        type="search"
        enterKeyHint="search"
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={onFocus}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-body-m text-neutral-900 outline-none placeholder:text-neutral-500 [&::-webkit-search-cancel-button]:hidden"
      />
    </label>
  )
})
