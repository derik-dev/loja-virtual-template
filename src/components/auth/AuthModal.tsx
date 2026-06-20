'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function AuthModal() {
  const { closeAuthModal, signIn, signUp, signInWithGoogle } = useAuth()
  const [googleLoading, setGoogleLoading] = useState(false)
  const [tab, setTab] = useState<'login' | 'signup'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  function switchTab(t: 'login' | 'signup') {
    setTab(t)
    setError(null)
    setSuccess(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (tab === 'login') {
      const { error } = await signIn(email, password)
      if (error) setError(traducirErro(error))
      else closeAuthModal()
    } else {
      const { error } = await signUp(email, password, name)
      if (error) setError(traducirErro(error))
      else setSuccess(true)
    }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeAuthModal} />

      <div className="relative bg-white w-full max-w-md p-8 shadow-2xl">
        {/* Fechar */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1 text-zinc-400 hover:text-zinc-900 transition-colors"
          aria-label="Fechar"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Logo */}
        <p className="text-center text-2xl font-black uppercase tracking-[0.12em] mb-7">VERO</p>

        {/* Tabs */}
        <div className="flex border-b border-zinc-200 mb-6">
          <button
            onClick={() => switchTab('login')}
            className={`flex-1 pb-3 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors ${tab === 'login' ? 'text-zinc-900 border-b-2 border-zinc-900 -mb-px' : 'text-zinc-400 hover:text-zinc-600'}`}
          >
            Entrar
          </button>
          <button
            onClick={() => switchTab('signup')}
            className={`flex-1 pb-3 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors ${tab === 'signup' ? 'text-zinc-900 border-b-2 border-zinc-900 -mb-px' : 'text-zinc-400 hover:text-zinc-600'}`}
          >
            Criar Conta
          </button>
        </div>

        {/* Google */}
        <button
          onClick={async () => {
            setGoogleLoading(true)
            await signInWithGoogle()
            setGoogleLoading(false)
          }}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-3 border border-zinc-300 py-3 text-xs font-bold uppercase tracking-[0.14em] text-zinc-700 hover:border-zinc-900 hover:text-zinc-900 transition-colors disabled:opacity-50 mb-5"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {googleLoading ? '...' : 'Continuar com Google'}
        </button>

        {/* Divisor */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-zinc-200" />
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">ou</span>
          <div className="flex-1 h-px bg-zinc-200" />
        </div>

        {success ? (
          <div className="text-center py-4">
            <p className="text-sm text-zinc-700 leading-relaxed">
              Conta criada com sucesso!<br />Verifique seu e-mail para confirmar o cadastro.
            </p>
            <button
              onClick={() => switchTab('login')}
              className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em] underline underline-offset-4 text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Fazer login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'signup' && (
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 mb-1.5">
                  Nome
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full border border-zinc-300 px-3 py-2.5 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 mb-1.5">
                E-mail
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full border border-zinc-300 px-3 py-2.5 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 mb-1.5">
                Senha
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full border border-zinc-300 px-3 py-2.5 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 transition-colors"
              />
            </div>

            {error && (
              <p className="text-xs text-red-600 leading-relaxed">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-zinc-900 text-white text-[11px] font-black uppercase tracking-[0.22em] hover:bg-zinc-700 transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? '...' : tab === 'login' ? 'ENTRAR' : 'CRIAR CONTA'}
            </button>

            {tab === 'login' && (
              <p className="text-center text-xs text-zinc-400 mt-3">
                Não tem conta?{' '}
                <button
                  type="button"
                  onClick={() => switchTab('signup')}
                  className="font-semibold text-zinc-700 hover:text-zinc-900 underline underline-offset-2"
                >
                  Cadastre-se
                </button>
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  )
}

function traducirErro(msg: string): string {
  if (msg.includes('Invalid login credentials')) return 'E-mail ou senha incorretos.'
  if (msg.includes('Email not confirmed')) return 'Confirme seu e-mail antes de entrar.'
  if (msg.includes('User already registered')) return 'Este e-mail já está cadastrado.'
  if (msg.includes('Password should be at least')) return 'A senha deve ter no mínimo 6 caracteres.'
  if (msg.includes('Unable to validate email address')) return 'E-mail inválido.'
  return msg
}
