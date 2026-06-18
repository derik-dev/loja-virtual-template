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

## Como o próximo Claude deve trabalhar

> **Leia esta seção antes de qualquer coisa.**

### Regras obrigatórias

1. **Sempre responder em português.**
2. **Commit + push após cada alteração de código.** Nunca acumule várias mudanças sem commitar.
3. **Nunca commitar `.env.local`** — adicione sempre por nome específico, nunca `git add .` ou `git add -A`.
4. **Nunca usar `git revert`.** Se algo precisa ser desfeito, edite o código diretamente. O usuário deixou claro: "ao inves de ir por git, so muda o codigo, mais seguro assim".
5. **Atualizar este arquivo (`projeto.md`) junto com cada alteração relevante** e incluir no mesmo commit.

### Fluxo de commit

```
1. Faz a alteração no código
2. Atualiza projeto.md se necessário
3. git add <arquivos específicos>
4. git commit -m "tipo: descrição clara"
5. git push
```

### Prefixos de commit

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `style:` mudança visual sem lógica
- `refactor:` refatoração sem mudar comportamento
- `chore:` arquivos de config, sql, etc.

---

## Integração com Supabase (adicionada em junho/2026)

O projeto foi migrado de dados mockados para Supabase. As páginas da loja e o painel admin consomem dados reais.

### Variáveis de ambiente (`.env.local`)

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

### `src/lib/supabase.ts`

Exporta:
- `supabase` — client público (anon key)
- `createAdminClient()` — client com service role key
- `mapProduct(row)` — converte row do Supabase (snake_case) para o tipo `Product` (camelCase). **Sempre usar esta função ao buscar produtos.**

### Tabela `products`

Criada/recriada por `supabase-products-complete.sql`. Campos:

| Campo | Tipo | Observação |
|---|---|---|
| `id` | text PK | |
| `slug` | text unique | usado na URL `/produto/[slug]` |
| `name` | text | |
| `description` | text | |
| `price` | numeric(10,2) | |
| `original_price` | numeric(10,2) | opcional, exibe preço riscado |
| `category` | text | |
| `stock` | integer | |
| `rating` | numeric(3,1) | |
| `review_count` | integer | |
| `featured` | boolean | exibe badge BEST SELLER |
| `images` | text[] | URLs das fotos (Supabase Storage) |
| `tags` | text[] | |
| `colors` | jsonb | `[{"name":"PRETO","hex":"#111111"}]` |
| `sizes` | text[] | ex: `["P","M","G","GG"]` |
| `features` | text[] | diferenciais do produto |
| `created_at` | timestamptz | |

### Outras tabelas

- **`orders`** — pedidos (id, customer_name, product_name, amount, status, created_at)
- **`customers`** — clientes (id, name, email, orders_count, total_spent, created_at)
- **`discounts`** — cupons (id, code, type, value, uses, max_uses, active, expires_at)

Criadas por `supabase-admin-schema.sql`.

### Storage

- Bucket `product-images` (público), configurado no `supabase-products-complete.sql`
- Upload feito pelo `ProductForm.tsx` via `supabase.storage.from('product-images').upload(...)`
- Preview imediato com `URL.createObjectURL()` antes do upload completar

### SQLs disponíveis

| Arquivo | O que faz |
|---|---|
| `supabase-products-complete.sql` | Recria `products` do zero com todos os campos + bucket de imagens. **Rodar este quando tiver dúvida sobre o schema.** |
| `supabase-admin-schema.sql` | Cria `orders`, `customers`, `discounts` + seed data |
| `supabase-storage.sql` | Só o bucket + políticas (já incluído no complete) |
| `supabase-alter-products.sql` | ALTER TABLE obsoleto — usar o complete |

---

## Painel Admin (adicionado em junho/2026)

SPA dentro de `src/app/admin/`. Navegação por estado (`Page` type), não por rotas Next.js.

### Arquivos

| Componente | Arquivo |
|---|---|
| Shell / roteamento interno | `src/app/admin/components/AdminShell.tsx` |
| Sidebar | `src/app/admin/components/Sidebar.tsx` |
| Dashboard (KPIs + gráficos) | `src/app/admin/components/Dashboard.tsx` |
| Pedidos | `src/app/admin/components/Pedidos.tsx` |
| Lista de produtos | `src/app/admin/components/AdminDashboard.tsx` |
| Formulário de produto | `src/app/admin/components/ProductForm.tsx` |
| Clientes | `src/app/admin/components/Clientes.tsx` |
| Descontos | `src/app/admin/components/Descontos.tsx` |
| Configurações | `src/app/admin/components/Configuracoes.tsx` |

### Sidebar

- Logo: `public/logo-branca.png` (fundo escuro zinc-900)
- Seções: Dashboard (sem label) · Gestão (Pedidos, Produtos, Clientes, Descontos)
- Footer: Configurações · Ver loja · Sair

### Formulário de produto (`ProductForm.tsx`)

**Tipo de produto** — seletor segmentado:

| Valor | Label | Tamanhos padrão |
|---|---|---|
| `roupas` | Roupa | P, M, G, GG, XGG |
| `calcados` | Tênis/Calçado | 34, 35, 36...44 |
| `eletronicos` | Eletrônico | sem tamanhos |
| `acessorios` | Acessório | sem tamanhos |

**Cores** — color picker nativo + campo de nome + pills. Salvo como jsonb `[{name, hex}]`.

**Imagens** — upload para Supabase Storage com preview imediato via `URL.createObjectURL()`.

---

## Tipos TypeScript principais (`src/lib/types.ts`)

```ts
export interface ProductColor { name: string; hex: string }

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  tags: string[]
  rating: number
  reviewCount: number
  stock: number
  featured: boolean
  colors?: ProductColor[]
  sizes?: string[]
  features?: string[]
}
```

---

## Bugs corrigidos (junho/2026)

| Bug | Causa | Solução |
|---|---|---|
| Grid vazio após fetch | `useMemo([filters])` sem `products` nas deps | Adicionado `products` às dependências |
| 404 ao clicar no produto | `notFound()` em client component + hooks depois de `return` | `notFound()` virou render condicional; todos os hooks movidos para o topo do componente |
| Imagem não aparecia no upload | Sem preview antes do upload completar | `URL.createObjectURL()` para preview imediato |
| "Bucket not found" no upload | Bucket não criado | Rodar `supabase-products-complete.sql` |
| Erro de schema no insert | Colunas `colors`/`sizes`/`features` não existiam | Rodar `supabase-products-complete.sql` |

---

## Assets públicos (`/public`)

| Arquivo | Uso |
|---|---|
| `logo-branca.png` | Header da loja (fundo escuro) e sidebar do admin |
| `logo-preta.png` | Header da loja após scroll (fundo branco) |
| `hero-fashion.png` | Banner da página de produtos |
| `section-*.png` | Fotos das seções editoriais na home |

---

## O que ainda precisa ser feito (atualizado junho/2026)

- [ ] Conectar home page ao Supabase para produtos em destaque (featured = true)
- [ ] Redesign: carrinho, checkout, conta
- [ ] Filtros avançados: tamanho, cor
- [ ] Variantes (tamanho/cor) integradas ao carrinho
- [ ] Responsividade mobile completa
- [ ] Substituir fotos Unsplash por fotos reais da Vero
- [ ] SEO: metadata dinâmica e sitemap
- [ ] Enrijecer políticas de RLS antes de produção real
- [ ] Integração com gateway de pagamento
- [ ] Autenticação de usuário (área da conta)

---

*Última atualização: 18/06/2026*
