export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-zinc-50 min-h-screen font-sans">
        {children}
      </body>
    </html>
  )
}
