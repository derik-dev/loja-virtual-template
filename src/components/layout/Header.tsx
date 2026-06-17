'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import MobileMenu from './MobileMenu'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const itemCount = useCartStore((s) => s.itemCount())

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/produtos', label: 'Produtos' },
    { href: '/sobre', label: 'Sobre' },
    { href: '/contato', label: 'Contato' },
  ]

  return (
    <>
      <header
        className={[
          'sticky top-0 z-40 w-full bg-white border-b border-slate-200 transition-shadow duration-200',
          scrolled ? 'shadow-md' : 'shadow-none',
        ].join(' ')}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-extrabold tracking-tight text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              LOJA
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-slate-600 rounded-lg hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Cart Button */}
              <button
                onClick={() => {
                  const event = new CustomEvent('toggle-cart')
                  window.dispatchEvent(event)
                }}
                aria-label="Carrinho de compras"
                className="relative p-2 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Menu"
                className="md:hidden p-2 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
      />
    </>
  )
}
