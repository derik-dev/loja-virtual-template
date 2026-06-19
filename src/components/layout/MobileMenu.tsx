'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface NavLink {
  href: string
  label: string
  submenu?: { href: string; label: string }[]
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  links: NavLink[]
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col md:hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 h-12 flex-shrink-0">
        <button onClick={onClose} aria-label="Fechar menu" className="text-white p-2">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <Link href="/" onClick={onClose} className="absolute left-1/2 -translate-x-1/2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-branca.png" alt="VERO" className="h-7 w-auto object-contain" />
        </Link>

        <div className="flex items-center text-white">
          <button aria-label="Buscar" className="p-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
          <button aria-label="Carrinho" className="p-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Account buttons */}
      <div className="px-5 pt-6 pb-4 flex flex-col gap-3 flex-shrink-0">
        <Link
          href="/conta"
          onClick={onClose}
          className="w-full border border-white text-white text-sm font-medium tracking-[0.12em] py-3 text-center hover:bg-white hover:text-black transition-colors"
        >
          Já Sou Cliente
        </Link>
        <Link
          href="/conta/cadastro"
          onClick={onClose}
          className="w-full border border-white text-white text-sm font-medium tracking-[0.12em] py-3 text-center hover:bg-white hover:text-black transition-colors"
        >
          Criar Conta
        </Link>
      </div>

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto px-5 pt-2">
        {links.map((link) => (
          <div key={link.label} className="border-b border-zinc-800">
            {link.submenu ? (
              <>
                <button
                  onClick={() => setExpanded(expanded === link.label ? null : link.label)}
                  className="w-full flex items-center justify-between py-4 text-white text-sm font-bold uppercase tracking-[0.14em]"
                >
                  {link.label}
                  <span className="text-xl font-light">{expanded === link.label ? '−' : '+'}</span>
                </button>
                {expanded === link.label && (
                  <div className="pb-3 flex flex-col gap-2 pl-2">
                    {link.submenu.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={onClose}
                        className="text-zinc-400 text-sm py-1.5 hover:text-white transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={link.href}
                onClick={onClose}
                className="flex items-center justify-between py-4 text-white text-sm font-bold uppercase tracking-[0.14em] hover:text-zinc-300 transition-colors"
              >
                {link.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  )
}
