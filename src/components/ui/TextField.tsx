import { useState } from 'react'
import { Icon } from '../icons/Icon'
import type { IconName } from '../icons/Icon'

interface TextFieldProps {
  label: string
  icon: IconName
  type: 'email' | 'password'
  placeholder: string
  value: string
  onChange: (value: string) => void
}

export function TextField({ label, icon, type, placeholder, value, onChange }: TextFieldProps) {
  const [visible, setVisible] = useState(false)
  const isPassword = type === 'password'
  return (
    <label className="flex w-full flex-col gap-2">
      <span className="text-label-m text-neutral-900">{label}</span>
      <span className="flex h-14 items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-0 px-4 transition-colors focus-within:border-brand-violet-600">
        <Icon name={icon} size={20} />
        <input
          type={isPassword && !visible ? 'password' : 'text'}
          inputMode={type === 'email' ? 'email' : undefined}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-body-m text-neutral-900 outline-none placeholder:text-neutral-500"
        />
        {isPassword && (
          <button type="button" aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'} onClick={() => setVisible((v) => !v)}>
            <Icon name="eye" size={20} />
          </button>
        )}
      </span>
    </label>
  )
}
