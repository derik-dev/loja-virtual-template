'use client'

import { useState } from 'react'
import Sidebar, { type Page } from './Sidebar'
import Dashboard from './Dashboard'
import AdminDashboard from './AdminDashboard'

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mb-4">
        <svg className="h-6 w-6 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
        </svg>
      </div>
      <h2 className="text-base font-black text-zinc-900 uppercase tracking-wide mb-2">{title}</h2>
      <p className="text-sm text-zinc-400">Esta seção está em desenvolvimento.</p>
    </div>
  )
}

export default function AdminShell({ onLogout }: { onLogout: () => void }) {
  const [page, setPage] = useState<Page>('dashboard')

  return (
    <div className="flex min-h-screen bg-zinc-50" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <Sidebar page={page} onNavigate={setPage} onLogout={onLogout} />
      <main className="flex-1 min-w-0">
        {page === 'dashboard' && <Dashboard />}
        {page === 'pedidos' && <ComingSoon title="Pedidos" />}
        {page === 'produtos' && <AdminDashboard onLogout={onLogout} />}
        {page === 'clientes' && <ComingSoon title="Clientes" />}
        {page === 'descontos' && <ComingSoon title="Descontos" />}
        {page === 'configuracoes' && <ComingSoon title="Configurações" />}
      </main>
    </div>
  )
}
