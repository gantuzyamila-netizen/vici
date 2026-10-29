import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Icon, MaskIcon, type IconName } from '../icons/Icon'
import { cn } from '../../lib/cn'
import type { TabId } from './chrome'

interface Tab {
  id: TabId
  label: string
  to: string
  icon: IconName
  disabled?: boolean
}

const leftTabs: Tab[] = [
  { id: 'home', label: 'Inicio', to: '/home', icon: 'home' },
  { id: 'pedidos', label: 'Pedidos', to: '/pedidos', icon: 'bag', disabled: true }, // sin pantalla diseñada
]
const rightTabs: Tab[] = [
  { id: 'soporte', label: 'Soporte', to: '/soporte', icon: 'info' },
  { id: 'perfil', label: 'Perfil', to: '/perfil', icon: 'user' },
]

function TabItem({ tab, active }: { tab: Tab; active: boolean }) {
  return (
    <Link
      to={tab.to}
      aria-disabled={tab.disabled}
      tabIndex={tab.disabled ? -1 : undefined}
      onClick={(event) => tab.disabled && event.preventDefault()}
      className={cn('w-[52px]', tab.disabled && 'cursor-not-allowed opacity-disabled')}
    >
      <motion.div
        whileTap={tab.disabled ? undefined : { scale: 0.9 }}
        className={cn('flex flex-col items-center gap-1 transition-colors duration-200', active ? 'text-brand-violet-600' : 'text-neutral-500')}
      >
        <MaskIcon name={tab.icon} size={24} />
        <span className="text-label-s">{tab.label}</span>
      </motion.div>
    </Link>
  )
}

export function TabBar({ activeTab }: { activeTab: TabId | null }) {
  const navigate = useNavigate()
  return (
    <motion.nav
      initial={{ y: 110, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 110, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 380, damping: 36 }}
      className="absolute inset-x-4 bottom-6 z-30 flex h-[72px] items-center justify-between rounded-[36px] bg-neutral-0 px-[18px] shadow-float"
    >
      {leftTabs.map((tab) => (
        <TabItem key={tab.id} tab={tab} active={activeTab === tab.id} />
      ))}
      <motion.button
        type="button"
        aria-label="Categorías"
        whileTap={{ scale: 0.92 }}
        onClick={() => navigate('/categorias')}
        className="flex size-14 shrink-0 items-center justify-center rounded-[28px] bg-brand-orange-500 shadow-orange"
      >
        <Icon name="clipboard" size={24} />
      </motion.button>
      {rightTabs.map((tab) => (
        <TabItem key={tab.id} tab={tab} active={activeTab === tab.id} />
      ))}
    </motion.nav>
  )
}
