import { Header, Footer } from '@/components/layout'
import { CartDrawer } from '@/components/cart'

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <CartDrawer />
    </>
  )
}
