'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  links: { href: string; label: string }[]
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <div className="absolute inset-y-0 left-0 w-72 bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <Link
            href="/"
            onClick={onClose}
            className="text-2xl font-extrabold text-indigo-600"
          >
            LOJA
          </Link>
          <button
            onClick={onClose}
            aria-label="Fechar menu"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="flex items-center px-4 py-3 text-base font-medium text-slate-700 rounded-xl hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-200">
          <p className="text-xs text-slate-400 text-center">© 2024 Loja Virtual</p>
        </div>
      </div>
    </div>
  )
}
