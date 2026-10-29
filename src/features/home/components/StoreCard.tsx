import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../../components/icons/Icon'
import { Badge } from '../../../components/ui/Badge'
import { cn } from '../../../lib/cn'
import { DISABLED_OPACITY } from '../../../lib/motion'
import type { Store } from '../../../types'

export function StoreCard({ store }: { store: Store }) {
  const navigate = useNavigate()
  const enabled = Boolean(store.to)
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: enabled ? 1 : DISABLED_OPACITY, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      whileTap={enabled ? { scale: 0.98 } : undefined}
      role="link"
      aria-disabled={!enabled}
      onClick={() => store.to && navigate(store.to)}
      className={cn('flex gap-[14px] rounded-[28px] bg-neutral-0 p-3 shadow-card', enabled ? 'cursor-pointer' : 'cursor-not-allowed')}
    >
      <img src={store.image} alt="" draggable={false} className="size-[92px] shrink-0 rounded-[20px] object-cover" />
      <div className="flex h-[92px] min-w-0 flex-1 flex-col justify-between">
        <div className="flex items-center gap-2">
          <h3 className="min-w-0 flex-1 truncate text-title-s text-neutral-900">{store.name}</h3>
          <Badge tone={store.badgeTone}>{store.badge}</Badge>
        </div>
        <p className="text-body-s text-neutral-500">{store.description}</p>
        <div className="flex w-fit items-center gap-[6px] rounded-full bg-neutral-100 py-[5px] pl-2 pr-[10px]">
          <Icon name="bike" size={16} />
          <span className="text-label-s text-neutral-900">{store.deliveryTime}</span>
        </div>
      </div>
    </motion.article>
  )
}
