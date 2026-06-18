import { Header, Footer } from '@/components/layout'
import { CartDrawer } from '@/components/cart'

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header sticky />
      <main className="min-h-screen pt-20">{children}</main>
      <Footer />
      <CartDrawer />
    </>
  )
}
