# Vero — Documentação do Projeto

## Visão Geral

**Vero** é uma loja de moda tecnológica com design premium, inspirado na estética da Insider Store Brasil. O projeto usa Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 e Zustand 5.

---

## O que foi feito

### Fundação e Configuração
- Stack definida: Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Zustand 5
- Fonte trocada de Inter para **DM Sans** (pesos 300–900), a alternativa gratuita mais próxima da Neue Haas Grotesk
- Dados mockados em `src/lib/data/products.ts` e `src/lib/data/categories.ts`
- Gerenciamento de carrinho via Zustand persistido em localStorage (`cart-storage`)

---

### Header
- Header transparente com efeito de overlay sobre o hero da homepage
- Transição para vidro fosco (`bg-white/75 backdrop-blur-md`) ao scrollar
- Announcement bar que some ao scrollar
- Logo condicional: `logo-branca.png` no topo / `logo-preta.png` após scroll
- Mega menu dropdown com submenu por categoria e barra de navegação escura
- Comportamento por página:
  - **Homepage**: `fixed` + transparente → frosted glass
  - **Demais páginas** (produtos, produto): estático, some ao scrollar

---

### Homepage (`/`)

Seções construídas na ordem:

| # | Seção | Descrição |
|---|-------|-----------|
| 1 | **Hero** | Imagem `hero-fashion.png`, `96vh`, gradiente lateral, texto editorial, botão COMPRAR, ticker scrollável |
| 2 | **Product Showcase** | Tabs masculino/feminino, carrossel horizontal com setas, 9 produtos por aba |
| 3 | **Banner Slider** | Cross-fade entre 2 slides (`95vh`), texto esquerda/direita, dots, auto-advance 6s |
| 4 | **Escolhas Inteligentes** | Grid 5 colunas de categorias com imagem + label |
| 5 | **Promo Slider** | Mesmo padrão do Banner Slider com tema escuro |
| 6 | **Vero in Real Life** | Galeria horizontal scrollável com 9 fotos, setas condicionais |
| 7 | **Loja Física** | Texto + iframe Google Maps em grid 2 colunas |
| 8 | **Texto Institucional** | Parágrafo sobre tecnologia Vero, botão "Leia mais" |
| 9 | **FAQ** | 10 perguntas em acordeão com chevron animado |
| 10 | **Footer** | Fundo zinc-950, logo branca, 4 colunas (Missão, Dúvidas, Sobre, Certificados), ícones de pagamento, back-to-top |

---

### Página de Produtos (`/produtos`)

- **Banner editorial** full-width (`42vh`) com imagem e texto overlay
- **Sidebar de filtros** sem caixas/bordas, checkboxes quadrados customizados, "ver mais" para categorias
- **Botão "ORDENAR POR"** no canto superior direito com dropdown
- **Grid 3 colunas** de produtos
- **ProductCard** redesenhado:
  - Imagem `3/4` full-bleed, sem bordas arredondadas
  - Badges empilhados no canto superior direito (BEST SELLER / X% OFF / LANÇAMENTO / ÚLTIMAS PEÇAS)
  - Swatches de cores gerados por produto
  - Nome + preço + rating minimalistas
  - Botão "Adicionar" desliza no hover

---

### Página de Produto (`/produto/[slug]`)

- **Galeria mosaic 2×2** à esquerda (imagens duplicadas para preencher o grid)
- **Painel direito sticky** (`h-screen overflow-y-auto`):
  - Nome do produto
  - Badges inline (BEST SELLER / LANÇAMENTO / X% OFF) + rating
  - Preço com original riscado
  - Seletor de cor com nome dinâmico ("COR: OFF WHITE")
  - Seletor de tamanho (P / M / G / GG) com estado ativo
  - Contador de quantidade
  - Botão preto "ADICIONAR AO CARRINHO"
  - Link "COMPRE PELO WHATSAPP"
  - Botão favoritos
  - Acordeões: Descrição / Diferenciais / Características / Composição
- **3 seções editoriais** alternando imagem e texto (Statement Piece / Tecnologia Funcional / Forever Piece)
- **Vero in Real Life** strip de fotos
- **Resumo de avaliações** com nota grande, barras de distribuição por estrela e badge "99% recomendam"
- **5 reviews** mockadas com avatar, estrelas, texto e compartilhar
- **Produtos relacionados** usando o mesmo ProductGrid

---

### Correções Técnicas
- `backgroundImage` em vez de `background` shorthand no PromoSlider (fix para `cover` não ser aplicado)
- `params` desembrulhado com `use(params)` para compatibilidade com Next.js 15/16 (params é agora uma Promise)
- `ReactNode` importado explicitamente para evitar erro de TypeScript que causava 404

---

## O que falta fazer

### Páginas
- [ ] **Carrinho** (`/carrinho`) — redesign completo no estilo Vero
- [ ] **Checkout** (`/checkout`) — redesign completo
- [ ] **Conta** (`/conta`) — área do cliente
- [ ] **Página 404** customizada no estilo Vero

### Funcionalidades
- [ ] **Busca** — modal de busca ao clicar na lupa do header
- [ ] **Wishlist** — página de favoritos (`/favoritos`)
- [ ] **Filtros avançados** — Gênero, Tamanho, Cor (atualmente só categoria e preço)
- [ ] **Variantes de produto** — integrar tamanho e cor selecionados ao adicionar no carrinho
- [ ] **Zoom de imagem** — lightbox ao clicar nas fotos do produto
- [ ] **Breadcrumb** na página de produto

### Conteúdo e Imagens
- [ ] Substituir todas as imagens de placeholder (Unsplash) por fotos reais da Vero
- [ ] Adicionar imagens reais aos banners (`section-3-winter-01.png`, `section-5-clearance-01.png`, etc.)
- [ ] Adicionar mais produtos ao mock data (`products.ts`)
- [ ] Criar categorias reais (Camisetas, Calças, Jaquetas, etc.)

### Backend e Integração
- [ ] Conectar a uma API ou CMS real (ex: Shopify Storefront API, Sanity, Strapi)
- [ ] Integração com gateway de pagamento (Mercado Pago, PagSeguro ou Stripe)
- [ ] Integração com WhatsApp Business
- [ ] Sistema real de avaliações
- [ ] Autenticação de usuário (área da conta)
- [ ] Rastreamento de pedidos

### SEO e Performance
- [ ] Metadata dinâmica por página (title, description, og:image)
- [ ] Sitemap.xml
- [ ] Otimização de imagens com `next/image` (substituir `<img>` onde possível)
- [ ] Lazy loading nas seções abaixo do fold

### UX e Detalhes
- [ ] Animações de entrada nas seções da homepage (scroll-triggered)
- [ ] Toast de confirmação ao adicionar ao carrinho
- [ ] Skeleton loading nos cards de produto
- [ ] Responsividade mobile completa (testar e ajustar todas as páginas)
- [ ] Modal de guia de tamanhos na página de produto
- [ ] Sticky "ADICIONAR AO CARRINHO" mobile na página de produto

---

## Estrutura de Arquivos

```
src/
├── app/
│   ├── page.tsx                    ✅ Homepage
│   ├── layout.tsx                  ✅ Root layout (DM Sans, metadata)
│   └── (store)/
│       ├── layout.tsx              ✅ Header + Footer para loja
│       ├── produtos/page.tsx       ✅ Listagem de produtos
│       ├── produto/[slug]/page.tsx ✅ Página do produto
│       ├── carrinho/page.tsx       ⚠️ Pendente redesign
│       ├── checkout/page.tsx       ⚠️ Pendente redesign
│       └── conta/page.tsx          ⚠️ Pendente redesign
├── components/
│   ├── layout/
│   │   ├── Header.tsx              ✅ Transparente + frosted glass + mega menu
│   │   ├── Footer.tsx              ✅ Footer completo zinc-950
│   │   └── MobileMenu.tsx          ✅ Menu mobile
│   ├── ui/
│   │   ├── BannerSlider.tsx        ✅ Cross-fade slider
│   │   ├── PromoSlider.tsx         ✅ Promo slider escuro
│   │   ├── RealLifeGallery.tsx     ✅ Galeria horizontal
│   │   └── FaqSection.tsx          ✅ FAQ acordeão
│   ├── product/
│   │   ├── ProductShowcase.tsx     ✅ Showcase tabs na home
│   │   ├── ProductCard.tsx         ✅ Card com swatches e badges
│   │   ├── ProductGrid.tsx         ✅ Grid 3 colunas
│   │   ├── ProductFilters.tsx      ✅ Sidebar sem caixas
│   │   └── ProductGallery.tsx      ✅ Mosaic 2×2
│   └── cart/
│       └── CartDrawer.tsx          ✅ Drawer lateral
├── store/
│   └── cartStore.ts                ✅ Zustand + localStorage
├── hooks/
│   ├── useCart.ts                  ✅
│   └── useWishlist.ts              ✅
└── lib/
    ├── data/
    │   ├── products.ts             ⚠️ Mock — substituir por API real
    │   └── categories.ts           ⚠️ Mock — substituir por API real
    ├── types.ts                    ✅
    └── utils.ts                    ✅
```

---

*Última atualização: Junho 2026*
