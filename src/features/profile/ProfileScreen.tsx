import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { MaskIcon, Icon, type IconName } from '../../components/icons/Icon'
import { CircleButton } from '../../components/ui/CircleButton'
import { user } from '../../data/user'
import { useBack } from '../../hooks/useBack'
import { cn } from '../../lib/cn'

interface RowProps {
  icon: IconName
  title: string
  subtitle?: string
  disabled?: boolean
  onClick?: () => void
}

// card-favoritos / card-premios / card-pagos / card-logout de Figma
function Row({ icon, title, subtitle, disabled = false, onClick }: RowProps) {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      onClick={onClick}
      className={cn('flex w-full items-center gap-3 rounded-[20px] bg-neutral-0 p-4 text-left shadow-[0_4px_6px_rgba(0,0,0,0.04)]', disabled && 'cursor-not-allowed opacity-disabled')}
    >
      <Icon name={icon} size={20} />
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="whitespace-nowrap text-label-m text-neutral-900">{title}</span>
        {subtitle && <span className="w-full text-body-s text-neutral-500">{subtitle}</span>}
      </span>
      <MaskIcon name="expand-right" size={24} className="text-[#121212]" />
    </motion.button>
  )
}

// Perfil (Figma nodes 96:15455 / 96:15673). Solo "Cerrar sesión" tiene destino diseñado.
export function ProfileScreen() {
  const navigate = useNavigate()
  const goBack = useBack('/home')

  return (
    <main className="no-scrollbar flex h-full flex-col overflow-y-auto bg-neutral-50 pb-[124px] pt-14 [&>*]:shrink-0">
      <header className="flex items-center gap-[14px] px-6">
        <CircleButton icon="back" label="Volver" onClick={goBack} />
        <h1 className="min-w-0 flex-1 text-title-m text-neutral-900">Perfil</h1>
      </header>

      <div className="mx-6 mt-5 flex h-28 items-center gap-2">
        <img src="/images/profile/avatar.png" alt="" draggable={false} className="size-28 shrink-0 object-cover" style={{ filter: 'drop-shadow(4px 0 7.5px rgba(0,0,0,0.25))' }} />
        <div className="flex min-w-0 flex-1 flex-col gap-1 whitespace-nowrap">
          <p className="text-title-m text-neutral-900">{user.fullName}</p>
          <p className="text-body-m text-neutral-500">{user.phone}</p>
        </div>
        <button type="button" disabled className="flex h-11 cursor-not-allowed items-center justify-center rounded-[22px] bg-brand-violet-600 pl-4 pr-3 text-label-m text-neutral-0 opacity-disabled">
          Editar
        </button>
      </div>

      <div className="flex flex-col gap-4 px-6 pb-6 pt-[17px]">
        <Row icon="heart-outline" title="Favoritos" subtitle="Tus comidas y comercios preferidos" disabled />
        <Row icon="trophy" title="Premios" subtitle="Canjeá tus cupones o premios acá" disabled />
        <Row icon="credit-card" title="Métodos de pago" subtitle="Añadí o modificá tus formas de pago" disabled />
        <Row icon="log-out" title="Cerrar sesión" onClick={() => navigate('/login')} />
      </div>
    </main>
  )
}
