'use client'

import { usePathname } from 'next/navigation'
import { Header, Footer } from '@/components/layout'
import { CartDrawer } from '@/components/cart'

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAccountPage = pathname === '/conta'

  return (
    <>
      {!isAccountPage && <Header />}
      <main className="min-h-screen">{children}</main>
      {!isAccountPage && <Footer />}
      {!isAccountPage && <CartDrawer />}
    </>
  )
}
