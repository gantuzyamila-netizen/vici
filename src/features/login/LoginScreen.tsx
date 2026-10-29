import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../components/icons/Icon'
import { Button } from '../../components/ui/Button'
import { TextField } from '../../components/ui/TextField'

function SocialButton({ label, icon, iconClass, onClick }: { label: string; icon: 'google' | 'apple'; iconClass: string; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="flex h-[52px] min-w-0 flex-1 items-center justify-center gap-[10px] rounded-[26px] border border-neutral-200 bg-neutral-0"
    >
      <span className="relative size-[26px] shrink-0 rounded-[13px] bg-brand-orange-100">
        <span className={`absolute ${iconClass}`}>
          <Icon name={icon} size={icon === 'google' ? 16 : 12} className={icon === 'apple' ? 'h-4 w-3' : ''} />
        </span>
      </span>
      <span className="text-label-m text-neutral-900">{label}</span>
    </motion.button>
  )
}

// 03 · Login (Figma node 80:14425). El prototipo no valida credenciales: cualquier ingreso lleva a la Home.
export function LoginScreen() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const enter = () => navigate('/home')

  return (
    <main className="relative h-full overflow-hidden bg-neutral-50">
      <div className="absolute left-6 top-[115px] flex w-[343px] flex-col gap-8">
        <div className="flex flex-col items-center gap-[10px]">
          <div className="flex size-[68px] items-center justify-center rounded-[22px] bg-brand-violet-600 shadow-button">
            <img src="/images/brand/logo-v.png" alt="Vici" width={42} height={41.911} draggable={false} className="block" />
          </div>
          <h1 className="whitespace-nowrap text-center text-display-xl text-neutral-900">Hola de nuevo</h1>
          <p className="text-center text-body-m text-neutral-500">Iniciá sesión para seguir pidiendo</p>
        </div>

        <div className="flex flex-col gap-[18px]">
          <div className="flex flex-col gap-4">
            <TextField label="Email" icon="mail" type="email" placeholder="Escribe aquí..." value={email} onChange={setEmail} />
            <TextField label="Contraseña" icon="lock" type="password" placeholder="Escribe aquí..." value={password} onChange={setPassword} />
            <button type="button" className="h-[18px] text-center text-label-m text-brand-violet-600 active:opacity-60">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <div className="flex flex-col gap-5">
            <Button variant="primary" onClick={enter}>
              Iniciar sesión
            </Button>
            <div className="flex h-[18px] items-center gap-3">
              <span className="h-px flex-1 bg-neutral-200" />
              <span className="whitespace-nowrap text-label-m text-neutral-500">o conectate con</span>
              <span className="h-px flex-1 bg-neutral-200" />
            </div>
            <div className="flex h-[52px] gap-3">
              <SocialButton label="Google" icon="google" iconClass="left-[5px] top-[5px]" onClick={enter} />
              <SocialButton label="Apple" icon="apple" iconClass="left-[7px] top-[5px]" onClick={enter} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
