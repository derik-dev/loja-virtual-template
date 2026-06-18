'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import Dashboard from './Dashboard'
import AdminDashboard from './AdminDashboard'

type Page = 'dashboard' | 'produtos'

export default function AdminShell({ onLogout }: { onLogout: () => void }) {
  const [page, setPage] = useState<Page>('dashboard')

  return (
    <div className="flex min-h-screen bg-zinc-50" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <Sidebar page={page} onNavigate={setPage} onLogout={onLogout} />
      <main className="flex-1 min-w-0">
        {page === 'dashboard' && <Dashboard />}
        {page === 'produtos' && <AdminDashboard onLogout={onLogout} />}
      </main>
    </div>
  )
}
