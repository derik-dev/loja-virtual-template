'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

type Tab = 'pedidos' | 'favoritos' | 'trocas' | 'suporte' | 'perfil'

const NAV_TABS: { key: Tab; label: string }[] = [
  { key: 'pedidos', label: 'Pedidos' },
  { key: 'favoritos', label: 'Favoritos' },
  { key: 'trocas', label: 'Trocas' },
  { key: 'suporte', label: 'Suporte' },
  { key: 'perfil', label: 'Perfil' },
]

export default function ContaPage() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('perfil')
  const [editingName, setEditingName] = useState(false)
  const [nameValue, setNameValue] = useState(
    user?.user_metadata?.name ?? user?.email?.split('@')[0] ?? ''
  )

  const displayName = user?.user_metadata?.name ?? user?.email?.split('@')[0] ?? 'Usuário'
  const email = user?.email ?? ''
  const initial = displayName[0]?.toUpperCase() ?? '?'

  async function handleSignOut() {
    await signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Header da conta */}
      <div className="border-b border-zinc-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          {/* Logo → home */}
          <Link href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-preta.png" alt="VERO" className="h-7 w-auto object-contain" />
          </Link>

          {/* Nav tabs */}
          <nav className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
            {NAV_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`text-sm whitespace-nowrap py-4 border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? 'border-zinc-900 text-zinc-900 font-semibold'
                    : 'border-transparent text-zinc-500 hover:text-zinc-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Avatar */}
          <div className="flex-shrink-0 h-8 w-8 rounded-full border border-zinc-300 flex items-center justify-center text-xs font-bold text-zinc-700">
            {initial}
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

        {/* ── PERFIL ── */}
        {activeTab === 'perfil' && (
          <div className="space-y-4">
            <h1 className="text-xl font-semibold text-zinc-900 mb-6">Perfil</h1>

            {/* Card dados */}
            <div className="border border-zinc-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                {editingName ? (
                  <input
                    autoFocus
                    value={nameValue}
                    onChange={e => setNameValue(e.target.value)}
                    onBlur={() => setEditingName(false)}
                    onKeyDown={e => e.key === 'Enter' && setEditingName(false)}
                    className="text-base font-semibold text-zinc-900 border-b border-zinc-400 focus:outline-none bg-transparent"
                  />
                ) : (
                  <span className="text-base font-semibold text-zinc-900">{nameValue || displayName}</span>
                )}
                <button
                  onClick={() => setEditingName(true)}
                  className="text-zinc-400 hover:text-zinc-700 transition-colors ml-2"
                  aria-label="Editar nome"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-zinc-400 mb-0.5">E-mail</p>
              <p className="text-sm text-zinc-700">{email}</p>
            </div>

            {/* Card endereços */}
            <div className="border border-zinc-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-base font-semibold text-zinc-900">Endereços</span>
                <button className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                  + Adicionar
                </button>
              </div>

              {/* Endereço vazio */}
              <div className="text-sm text-zinc-400 italic">
                Nenhum endereço cadastrado.
              </div>
            </div>

            {/* Sair */}
            <div className="pt-2">
              <button
                onClick={handleSignOut}
                className="border border-zinc-300 rounded-lg px-5 py-2 text-sm text-zinc-700 hover:border-zinc-900 hover:text-zinc-900 transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        )}

        {/* ── PEDIDOS ── */}
        {activeTab === 'pedidos' && (
          <div>
            <h1 className="text-xl font-semibold text-zinc-900 mb-6">Pedidos</h1>
            <div className="border border-zinc-200 rounded-xl p-8 text-center">
              <p className="text-sm text-zinc-400">Você ainda não fez nenhum pedido.</p>
              <Link
                href="/produtos"
                className="inline-block mt-4 text-xs font-bold uppercase tracking-[0.16em] underline underline-offset-4 text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                Ver produtos
              </Link>
            </div>
          </div>
        )}

        {/* ── FAVORITOS ── */}
        {activeTab === 'favoritos' && (
          <div>
            <h1 className="text-xl font-semibold text-zinc-900 mb-6">Favoritos</h1>
            <div className="border border-zinc-200 rounded-xl p-8 text-center">
              <p className="text-sm text-zinc-400">Você não tem produtos favoritos ainda.</p>
              <Link
                href="/produtos"
                className="inline-block mt-4 text-xs font-bold uppercase tracking-[0.16em] underline underline-offset-4 text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                Explorar produtos
              </Link>
            </div>
          </div>
        )}

        {/* ── TROCAS ── */}
        {activeTab === 'trocas' && (
          <div>
            <h1 className="text-xl font-semibold text-zinc-900 mb-6">Trocas</h1>
            <div className="border border-zinc-200 rounded-xl p-8 text-center">
              <p className="text-sm text-zinc-400">Nenhuma solicitação de troca encontrada.</p>
            </div>
          </div>
        )}

        {/* ── SUPORTE ── */}
        {activeTab === 'suporte' && (
          <div>
            <h1 className="text-xl font-semibold text-zinc-900 mb-6">Suporte</h1>
            <div className="border border-zinc-200 rounded-xl p-6 space-y-4">
              <p className="text-sm text-zinc-600">
                Precisa de ajuda? Entre em contato pelo WhatsApp ou e-mail.
              </p>
              <a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-zinc-300 rounded-lg px-5 py-2.5 text-sm text-zinc-700 hover:border-zinc-900 hover:text-zinc-900 transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        )}

      </div>

      {/* Footer da conta */}
      <div className="border-t border-zinc-100 mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-wrap gap-4 justify-center">
          {['Política de reembolso', 'Frete', 'Política de privacidade', 'Termos de serviço', 'Cancelamentos', 'Informações de contato'].map((item) => (
            <Link key={item} href="#" className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors underline underline-offset-2">
              {item}
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}
