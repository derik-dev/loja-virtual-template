'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function AuthModal() {
  const { closeAuthModal, signIn, signUp } = useAuth()
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
