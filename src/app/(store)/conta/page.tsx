'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'

type Tab = 'pedidos' | 'dados' | 'enderecos'

const mockOrders = [
  {
    id: '#10231',
    date: '12/05/2024',
    status: 'Entregue',
    statusColor: 'text-green-700 bg-green-100',
    items: 3,
    total: 489.97,
  },
  {
    id: '#10198',
    date: '02/04/2024',
    status: 'Em trânsito',
    statusColor: 'text-blue-700 bg-blue-100',
    items: 1,
    total: 899.99,
  },
  {
    id: '#10145',
    date: '15/02/2024',
    status: 'Entregue',
    statusColor: 'text-green-700 bg-green-100',
    items: 2,
    total: 279.98,
  },
]

const mockAddresses = [
  {
    id: '1',
    label: 'Casa',
    address: 'Rua das Flores, 123, Apto 42',
    city: 'São Paulo',
    state: 'SP',
    zip: '01310-100',
    default: true,
  },
  {
    id: '2',
    label: 'Trabalho',
    address: 'Av. Paulista, 1578, Sala 304',
    city: 'São Paulo',
    state: 'SP',
    zip: '01310-200',
    default: false,
  },
]

export default function ContaPage() {
  const [activeTab, setActiveTab] = useState<Tab>('pedidos')

  const tabs: { key: Tab; label: string }[] = [
    { key: 'pedidos', label: 'Meus Pedidos' },
    { key: 'dados', label: 'Dados Pessoais' },
    { key: 'enderecos', label: 'Endereços' },
  ]

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Minha Conta</h1>

      {/* Tabs */}
      <div className="border-b border-slate-200 mb-8">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={[
                'px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 transition-colors',
                activeTab === tab.key
                  ? 'border-indigo-600 text-indigo-600 bg-indigo-50'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50',
              ].join(' ')}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pedidos */}
      {activeTab === 'pedidos' && (
        <div className="space-y-4">
          {mockOrders.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <p>Você ainda não fez nenhum pedido.</p>
            </div>
          ) : (
            mockOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-indigo-200 hover:shadow-sm transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-semibold text-slate-900">{order.id}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{order.date}</p>
                    </div>
                    <span className={`text-xs font-semibold rounded-full px-3 py-1 ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-sm">
                      <span className="text-slate-500">{order.items} {order.items === 1 ? 'item' : 'itens'}</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{formatCurrency(order.total)}</p>
                    </div>
                    <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                      Ver detalhes
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Dados Pessoais */}
      {activeTab === 'dados' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-5">Editar Perfil</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <Input label="Nome" defaultValue="João Silva" />
              <Input label="Sobrenome" defaultValue="Pereira" />
              <Input label="E-mail" type="email" defaultValue="joao@email.com" />
              <Input label="Telefone" defaultValue="(11) 99999-9999" />
              <Input label="CPF" defaultValue="000.000.000-00" disabled className="opacity-60" />
              <Input label="Data de nascimento" type="date" defaultValue="1990-05-15" />
            </div>
            <div className="border-t border-slate-100 pt-5">
              <h3 className="font-medium text-slate-800 mb-4">Alterar senha</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Senha atual" type="password" placeholder="••••••••" />
                <div className="hidden sm:block" />
                <Input label="Nova senha" type="password" placeholder="••••••••" />
                <Input label="Confirmar nova senha" type="password" placeholder="••••••••" />
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <Button type="submit" variant="primary">
                Salvar Alterações
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Endereços */}
      {activeTab === 'enderecos' && (
        <div className="space-y-4">
          {mockAddresses.map((addr) => (
            <div
              key={addr.id}
              className={[
                'bg-white rounded-2xl border p-5',
                addr.default ? 'border-indigo-300 ring-1 ring-indigo-200' : 'border-slate-200',
              ].join(' ')}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-slate-900">{addr.label}</p>
                    {addr.default && (
                      <span className="text-xs bg-indigo-100 text-indigo-700 rounded-full px-2 py-0.5 font-medium">
                        Padrão
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600">{addr.address}</p>
                  <p className="text-sm text-slate-600">
                    {addr.city}, {addr.state} — {addr.zip}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                    Editar
                  </button>
                  {!addr.default && (
                    <button className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors">
                      Remover
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          <button className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-300 text-sm font-medium text-slate-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Adicionar novo endereço
          </button>
        </div>
      )}
    </div>
  )
}
