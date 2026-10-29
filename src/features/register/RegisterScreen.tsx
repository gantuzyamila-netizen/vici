import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { SocialButton } from '../../components/ui/SocialButton'
import { TextField } from '../../components/ui/TextField'

// 03 · Registro (Figma node 82:14656). El prototipo no valida los datos: cualquier ingreso lleva a la Home.
export function RegisterScreen() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeat, setRepeat] = useState('')
  const enter = () => navigate('/home')

  return (
    <main className="relative h-full overflow-hidden bg-neutral-50">
      <div className="absolute left-6 top-[115px] flex w-[343px] flex-col gap-8">
        <div className="flex flex-col items-center gap-[10px]">
          <div className="flex size-[68px] items-center justify-center rounded-[22px] bg-brand-violet-600 shadow-button">
            <img src="/images/brand/logo-v.png" alt="Vici" width={42} height={41.911} draggable={false} className="block" />
          </div>
          <h1 className="whitespace-nowrap text-center text-display-xl text-neutral-900">Creá tu cuenta</h1>
          <p className="text-center text-[16px] leading-5 text-neutral-500">Completá tus datos para empezar a pedir</p>
        </div>

        <div className="flex flex-col gap-[18px]">
          <div className="flex flex-col gap-4">
            <TextField label="Email" icon="mail" type="email" placeholder="Escribe tu email" value={email} onChange={setEmail} />
            <TextField label="Contraseña" icon="lock" type="password" placeholder="Escribe tu contraseña" value={password} onChange={setPassword} />
            <TextField label="Repetir contraseña" icon="lock" type="password" placeholder="Repetí tu contraseña" value={repeat} onChange={setRepeat} />
          </div>

          <div className="flex flex-col gap-5">
            <Button variant="primary" onClick={enter}>
              Crear cuenta
            </Button>
            <div className="flex h-[18px] items-center gap-3">
              <span className="h-px flex-1 bg-neutral-200" />
              <span className="whitespace-nowrap text-label-m text-neutral-500">o registrate con</span>
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
