'use client'

import Link from 'next/link'

const missionLinks = [
  { href: '/sobre', label: 'Sobre a Vero' },
  { href: '/shop', label: 'Shop Global' },
  { href: '/loja-fisica', label: 'Loja Física (SP capital)' },
  { href: '/rebranding', label: 'Rebranding' },
  { href: '/sustentabilidade', label: 'Sustentabilidade' },
  { href: '/tecnologia', label: 'Nossa Tecnologia' },
  { href: '/blog', label: 'Blog' },
  { href: '/empresa', label: 'Compre para sua empresa' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/carreiras', label: 'Junte-se ao time Vero' },
  { href: '/mapa-do-site', label: 'Mapa do Site' },
]

const duvidaLinks = [
  { href: '/privacidade', label: 'Política de Privacidade e Segurança de Dados', highlight: true },
  { href: '/termos', label: 'Termos e Condições de Uso da Vero', highlight: false },
  { href: '/troca', label: 'Política de Troca e Devolução', highlight: false },
  { href: '/rewards', label: 'Vero Rewards - Termos e Condições Gerais', highlight: false },
  { href: '/faq', label: 'Ajuda / FAQ', highlight: false },
  { href: '/imprensa', label: 'Imprensa / PR', highlight: false },
  { href: '/parcerias', label: 'Parcerias de Marca', highlight: false },
  { href: '/creator', label: 'Seja nosso Creator', highlight: false },
  { href: '/troca-devolucao', label: 'TROCA & DEVOLUÇÃO', highlight: false },
  { href: '/fraude', label: 'Denúncia de Fraudes', highlight: false },
]

const certBadges = [
  'Loja Protegida', 'Eu Reciclo', 'e-bit', 'Google Site Seguro',
  'KPMG Emerging Giants', 'RA 1000 Reclame Aqui', 'Tech T-Shirt®',
]

export default function Footer() {
  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-zinc-950 text-zinc-400">

      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-8 sm:px-14 lg:px-20 pt-16 pb-10">
        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-branca.png" alt="VERO" className="h-10 w-auto object-contain mb-12" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Nossa Missão + Contato */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white mb-4">Nossa Missão</h4>
            <p className="text-xs leading-relaxed text-zinc-400">
              A Vero nasceu para impulsionar a evolução da indústria da moda. Aprendemos, inovamos e melhoramos constantemente, para criar um mundo onde todos são encorajados a subir a barra e buscar excelência.
            </p>

            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white mt-8 mb-4">Contato</h4>
            <div className="flex items-center gap-4">
              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              {/* YouTube */}
              <a href="#" aria-label="YouTube" className="hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              {/* Pinterest */}
              <a href="#" aria-label="Pinterest" className="hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
              </a>
            </div>
          </div>

          {/* Dúvidas */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white mb-4">Dúvidas</h4>
            <ul className="space-y-2.5">
              {duvidaLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`text-xs leading-snug transition-colors ${l.highlight ? 'text-blue-400 hover:text-blue-300' : 'text-zinc-400 hover:text-white'}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sobre */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white mb-4">Sobre</h4>
            <ul className="space-y-2.5">
              {missionLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs text-zinc-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Certificados */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white mb-4">Certificados</h4>
            <div className="grid grid-cols-2 gap-3">
              {certBadges.map((badge) => (
                <div
                  key={badge}
                  className="bg-zinc-900 border border-zinc-800 rounded px-2 py-2 flex items-center justify-center"
                >
                  <span className="text-[10px] text-zinc-500 text-center leading-tight">{badge}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800">
        <div className="mx-auto max-w-7xl px-8 sm:px-14 lg:px-20 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs text-zinc-600">© Vero</p>
            <p className="text-xs text-zinc-700 mt-0.5">CNPJ 00.000.000/0001-00 — Vero Comércio e Confecção de Peças do Vestuário Ltda.</p>
          </div>

          {/* Payment icons */}
          <div className="flex items-center gap-2">
            {['AMEX', 'ELO', 'Hiper', 'Hipercard', 'Master', 'Visa'].map((p) => (
              <span key={p} className="text-[9px] font-bold text-zinc-500 bg-zinc-900 border border-zinc-800 rounded px-1.5 py-0.5">
                {p}
              </span>
            ))}
          </div>

          <p className="text-xs text-zinc-600">Created by <span className="text-zinc-400 font-semibold">Vero</span></p>
        </div>
      </div>

      {/* Back to top */}
      <div className="flex justify-center py-4 border-t border-zinc-800">
        <button onClick={scrollTop} aria-label="Voltar ao topo" className="text-zinc-600 hover:text-white transition-colors">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>

    </footer>
  )
}
