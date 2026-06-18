'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import MobileMenu from './MobileMenu'

interface HeaderProps {
  overlay?: boolean
  sticky?: boolean
}

const navLinks = [
  {
    href: '/produtos',
    label: 'Produtos',
    submenu: [
      { href: '/produtos', label: 'Ver todos os produtos' },
      { href: '/produtos', label: 'Mais vendidos' },
      { href: '/produtos', label: 'Lançamentos' },
      { href: '/produtos', label: 'Promoções' },
    ],
  },
  {
    href: '/produtos?categoria=roupas',
    label: 'Roupas',
    submenu: [
      { href: '/produtos?categoria=roupas', label: 'Ver tudo de Roupas' },
      { href: '/produtos?categoria=roupas', label: 'Camisetas' },
      { href: '/produtos?categoria=roupas', label: 'Calças' },
      { href: '/produtos?categoria=roupas', label: 'Vestidos' },
      { href: '/produtos?categoria=roupas', label: 'Jaquetas' },
    ],
  },
  {
    href: '/produtos?categoria=acessorios',
    label: 'Acessórios',
    submenu: [
      { href: '/produtos?categoria=acessorios', label: 'Ver tudo de Acessórios' },
      { href: '/produtos?categoria=acessorios', label: 'Bolsas' },
      { href: '/produtos?categoria=acessorios', label: 'Cintos' },
      { href: '/produtos?categoria=acessorios', label: 'Óculos' },
      { href: '/produtos?categoria=acessorios', label: 'Chapéus' },
    ],
  },
  {
    href: '/produtos?categoria=eletronicos',
    label: 'Eletrônicos',
    submenu: [
      { href: '/produtos?categoria=eletronicos', label: 'Ver tudo de Eletrônicos' },
      { href: '/produtos?categoria=eletronicos', label: 'Smartphones' },
      { href: '/produtos?categoria=eletronicos', label: 'Headphones' },
      { href: '/produtos?categoria=eletronicos', label: 'Relógios' },
    ],
  },
  {
    href: '/produtos?categoria=ofertas',
    label: 'Ofertas',
    submenu: [
      { href: '/produtos?categoria=ofertas', label: 'Ver tudo de Ofertas' },
      { href: '/produtos?categoria=ofertas', label: 'Liquidação' },
      { href: '/produtos?categoria=ofertas', label: 'Cupons' },
      { href: '/produtos?categoria=ofertas', label: 'Outlet' },
    ],
  },
  {
    href: '/produtos',
    label: 'Novidades',
    submenu: [
      { href: '/produtos', label: 'Recém chegados' },
      { href: '/produtos', label: 'Coming Soon' },
      { href: '/produtos', label: 'Edições limitadas' },
    ],
  },
]

export default function Header({ overlay = false, sticky = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const itemCount = useCartStore((s) => s.itemCount())

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function openMenu(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveMenu(label)
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120)
  }

  const hasDropdown = activeMenu !== null
  // texto/ícones brancos apenas no topo (overlay, sem scroll, sem dropdown)
  const lightText = !hasDropdown && !scrolled && overlay

  let headerBg: string
  if (hasDropdown) {
    headerBg = 'bg-white border-b border-zinc-200 shadow-sm'
  } else if (!scrolled && overlay) {
    headerBg = 'bg-transparent'
  } else if (scrolled && overlay) {
    headerBg = 'bg-white/75 backdrop-blur-md'
  } else {
    headerBg = 'bg-white border-b border-zinc-200 shadow-sm'
  }

  return (
    <>
      <header
        className={[
          'w-full z-40 transition-all duration-300',
          overlay ? 'fixed top-0 left-0 right-0' : sticky ? 'fixed top-0 left-0 right-0' : 'sticky top-0',
          headerBg,
        ].join(' ')}
        onMouseLeave={scheduleClose}
      >
        {/* Announcement bar — só no overlay, some ao rolar */}
        {overlay && (
          <div
            className={[
              'bg-zinc-800 text-center overflow-hidden transition-all duration-300',
              scrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-10 py-2.5 opacity-100',
            ].join(' ')}
          >
            <p className="text-[11px] font-semibold tracking-[0.18em] text-white uppercase">
              Roupas tecnológicas: tecidos inteligentes e design funcional
            </p>
          </div>
        )}

        <div className="w-full pl-8 pr-10 sm:pl-12 sm:pr-14 lg:pl-20 lg:pr-20">
          <div className="flex h-20 items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightText ? '/logo-branca.png' : '/logo-preta.png'}
                alt="VERO"
                className="h-8 w-auto object-contain transition-opacity duration-300"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center">
              {navLinks.map((link) => {
                const isActive = activeMenu === link.label
                const textColor = lightText
                  ? 'text-white hover:text-white/75'
                  : 'text-zinc-700 hover:text-zinc-900'
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => openMenu(link.label)}
                  >
                    <Link
                      href={link.href}
                      className={`px-3.5 py-2 text-base font-normal uppercase tracking-[0.12em] transition-colors inline-block ${textColor} ${isActive ? 'underline underline-offset-4' : ''}`}
                    >
                      {link.label}
                    </Link>
                  </div>
                )
              })}
            </nav>

            {/* Ações */}
            <div className={`flex items-center gap-0.5 transition-colors ${lightText ? 'text-white' : 'text-zinc-600'}`}>

              {/* Ajuda */}
              <button aria-label="Ajuda" className="p-2 hover:opacity-70 transition-opacity">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
              </button>

              {/* Busca */}
              <button aria-label="Buscar" className="p-2 hover:opacity-70 transition-opacity">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>

              {/* Carrinho */}
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('toggle-cart'))}
                aria-label="Carrinho de compras"
                className="relative p-2 hover:opacity-70 transition-opacity"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </button>

              {/* Conta */}
              <button aria-label="Minha conta" className="p-2 hover:opacity-70 transition-opacity">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </button>

              {/* Hamburger mobile */}
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Menu"
                className="md:hidden p-2 hover:opacity-70 transition-opacity"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>

          </div>
        </div>

        {/* Mega dropdown */}
        {activeMenu && (() => {
          const active = navLinks.find((l) => l.label === activeMenu)
          if (!active) return null
          return (
            <div
              className="absolute left-0 right-0 bg-white border-t border-zinc-100 shadow-lg"
              onMouseEnter={() => openMenu(activeMenu)}
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <ul className="flex flex-col gap-4">
                  {active.submenu.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={() => setActiveMenu(null)}
                        className="text-sm text-zinc-700 hover:text-zinc-900 hover:underline underline-offset-4 transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-zinc-900 px-4 sm:px-6 lg:px-8 py-3 flex justify-end">
                <Link
                  href={active.href}
                  onClick={() => setActiveMenu(null)}
                  className="text-sm text-white font-medium hover:underline underline-offset-4 transition-colors"
                >
                  Navegue por tudo →
                </Link>
              </div>
            </div>
          )
        })()}
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
      />
    </>
  )
}
