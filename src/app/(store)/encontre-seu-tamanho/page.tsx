'use client'

import { useState, useRef, useCallback, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProdutoContext {
  nome: string
  categoria: string
  tamanhos: string[]
  imagem: string
}

interface AvatarData {
  shape: 'atletico' | 'retangular' | 'triangulo' | 'triangulo-invertido' | 'oval'
  ombroLargura: 'estreito' | 'medio' | 'largo'
  cinturaMarcada: boolean
  quadrilLargura: 'estreito' | 'medio' | 'largo'
}

interface ResultData {
  shape: string
  descricaoShape: string
  tamanhoIdeal: string
  tamanhoAlternativo: string
  ombros: string
  peito: string
  cintura: string
  quadril: string
  dicaGeral: string
  avatar: AvatarData
}

// ─── Avatar SVG ───────────────────────────────────────────────────────────────

// sw = shoulder width, ww = waist width, hw = hip width (all in px, centered at cx=100)
const SHAPE_CONFIGS: Record<string, { sw: number; ww: number; hw: number; label: string }> = {
  'atletico':            { sw: 100, ww: 52,  hw: 76,  label: 'Atlético'           },
  'retangular':          { sw: 78,  ww: 74,  hw: 78,  label: 'Retangular'         },
  'triangulo-invertido': { sw: 122, ww: 50,  hw: 56,  label: 'Triângulo Invertido' },
  'triangulo':           { sw: 54,  ww: 62,  hw: 106, label: 'Triângulo'          },
  'oval':                { sw: 76,  ww: 98,  hw: 80,  label: 'Oval'               },
}

function BodyAvatar({ avatar }: { avatar: AvatarData }) {
  const cfg = SHAPE_CONFIGS[avatar.shape] ?? SHAPE_CONFIGS['retangular']

  const cx    = 100
  const headR = 14
  const headY = 18
  // fixed vertical landmarks
  const shoulderY = 46
  const waistY    = 112
  const hipY      = 136
  const legEndY   = 242
  const legHW     = Math.max(14, Math.min(cfg.hw / 2 * 0.42, 22)) // leg half-width proportional to hips
  const legGap    = 7   // half of crotch gap

  const ls = cx - cfg.sw / 2
  const rs = cx + cfg.sw / 2
  const lw = cx - cfg.ww / 2
  const rw = cx + cfg.ww / 2
  const lh = cx - cfg.hw / 2
  const rh = cx + cfg.hw / 2

  // Control point offset for the shoulder→waist curve (makes it more or less pronounced)
  const cpShoulderDown = 26
  const cpWaistUp      = 20

  const body = [
    `M ${ls} ${shoulderY}`,
    // left shoulder → waist
    `C ${ls} ${shoulderY + cpShoulderDown} ${lw} ${waistY - cpWaistUp} ${lw} ${waistY}`,
    // left waist → hip
    `C ${lw} ${waistY + 12} ${lh} ${hipY - 8} ${lh} ${hipY}`,
    // left outer leg
    `L ${cx - legHW} ${legEndY}`,
    // crotch
    `L ${cx - legGap} ${legEndY}`,
    `Q ${cx} ${hipY + 22} ${cx + legGap} ${legEndY}`,
    // right outer leg
    `L ${cx + legHW} ${legEndY}`,
    // right hip → waist
    `L ${rh} ${hipY}`,
    `C ${rh} ${hipY - 8} ${rw} ${waistY + 12} ${rw} ${waistY}`,
    // right waist → shoulder
    `C ${rw} ${waistY - cpWaistUp} ${rs} ${shoulderY + cpShoulderDown} ${rs} ${shoulderY}`,
    `Z`,
  ].join(' ')

  // Arms hang from shoulder points, curve down to elbow level
  const armLen    = waistY - shoulderY - 10
  const armOffset = 15

  return (
    <svg viewBox="0 0 200 260" className="w-full h-full" fill="none">
      {/* Head */}
      <circle cx={cx} cy={headY} r={headR} fill="#18181b" />
      {/* Neck */}
      <rect x={cx - 5} y={headY + headR - 1} width={10} height={11} rx={2} fill="#18181b" />
      {/* Body */}
      <path d={body} fill="#18181b" />
      {/* Left arm */}
      <path
        d={`M ${ls} ${shoulderY + 5} C ${ls - armOffset} ${shoulderY + armLen * 0.4} ${ls - armOffset - 2} ${shoulderY + armLen * 0.8} ${ls - 5} ${shoulderY + armLen}`}
        stroke="#18181b" strokeWidth={11} strokeLinecap="round" fill="none"
      />
      {/* Right arm */}
      <path
        d={`M ${rs} ${shoulderY + 5} C ${rs + armOffset} ${shoulderY + armLen * 0.4} ${rs + armOffset + 2} ${shoulderY + armLen * 0.8} ${rs + 5} ${shoulderY + armLen}`}
        stroke="#18181b" strokeWidth={11} strokeLinecap="round" fill="none"
      />
    </svg>
  )
}

// ─── Product Banner ───────────────────────────────────────────────────────────

function ProductBanner({ produto }: { produto: ProdutoContext }) {
  return (
    <div className="flex items-center gap-4 border border-zinc-200 p-4 mb-8 bg-zinc-50">
      {produto.imagem && (
        <div className="w-14 h-18 flex-shrink-0 overflow-hidden bg-zinc-100">
          <img src={produto.imagem} alt={produto.nome} className="w-full h-full object-cover" style={{ height: '72px' }} />
        </div>
      )}
      <div className="min-w-0">
        <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-zinc-400 mb-0.5">Analisando para</p>
        <p className="text-xs font-bold text-zinc-900 uppercase tracking-wide leading-snug line-clamp-2">{produto.nome}</p>
        {produto.tamanhos.length > 0 && (
          <p className="text-[10px] text-zinc-400 mt-1">Tamanhos: {produto.tamanhos.join(' · ')}</p>
        )}
      </div>
    </div>
  )
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between text-[10px] font-bold tracking-[0.15em] uppercase text-zinc-400 mb-2">
        <span>Etapa {step} de {total}</span>
        <span>{Math.round((step / total) * 100)}%</span>
      </div>
      <div className="h-0.5 bg-zinc-200 w-full">
        <div className="h-full bg-zinc-900 transition-all duration-500" style={{ width: `${(step / total) * 100}%` }} />
      </div>
    </div>
  )
}

// ─── Body Illustration ────────────────────────────────────────────────────────

function MeasureIllustration() {
  return (
    <svg viewBox="0 0 120 280" className="w-full h-full" fill="none">
      <circle cx="60" cy="28" r="18" stroke="#d4d4d8" strokeWidth="1.5" />
      <rect x="52" y="44" width="16" height="12" rx="3" stroke="#d4d4d8" strokeWidth="1.5" />
      <path d="M28 58 C28 72 36 90 38 102 C40 114 40 122 40 130 C40 138 36 148 34 168 L42 230 M92 58 C92 72 84 90 82 102 C80 114 80 122 80 130 C80 138 84 148 86 168 L78 230" stroke="#d4d4d8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <line x1="28" y1="58" x2="92" y2="58" stroke="#d4d4d8" strokeWidth="1.5" />
      <line x1="32" y1="78" x2="88" y2="78" stroke="#d4d4d8" strokeWidth="1" strokeDasharray="3 2" />
      <line x1="38" y1="108" x2="82" y2="108" stroke="#d4d4d8" strokeWidth="1" strokeDasharray="3 2" />
      <line x1="34" y1="132" x2="86" y2="132" stroke="#d4d4d8" strokeWidth="1" strokeDasharray="3 2" />
      <text x="95" y="62" fill="#a1a1aa" fontSize="8" fontFamily="sans-serif">Ombro</text>
      <text x="95" y="82" fill="#a1a1aa" fontSize="8" fontFamily="sans-serif">Peito</text>
      <text x="95" y="112" fill="#a1a1aa" fontSize="8" fontFamily="sans-serif">Cintura</text>
      <text x="95" y="136" fill="#a1a1aa" fontSize="8" fontFamily="sans-serif">Quadril</text>
    </svg>
  )
}

// ─── Loading ──────────────────────────────────────────────────────────────────

const LOADING_TEXTS = [
  'Analisando suas medidas...',
  'Identificando seu shape corporal...',
  'Calculando o tamanho ideal...',
  'Finalizando recomendações...',
]

function LoadingScreen() {
  const [textIdx, setTextIdx] = useState(0)

  useEffect(() => {
    const iv = setInterval(() => setTextIdx((i) => (i + 1) % LOADING_TEXTS.length), 2000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-10">
      <div className="relative w-24 h-48">
        <svg viewBox="0 0 80 160" className="w-full h-full" fill="none">
          <circle cx="40" cy="16" r="12" fill="#e4e4e7" />
          <rect x="33" y="27" width="14" height="9" rx="3" fill="#e4e4e7" />
          <path d="M18 38 C18 48 24 60 25 68 C26 76 26 80 26 85 C26 90 24 96 22 110 L28 145 M62 38 C62 48 56 60 55 68 C54 76 54 80 54 85 C54 90 56 96 58 110 L52 145" stroke="#e4e4e7" strokeWidth="9" strokeLinecap="round" fill="none"/>
          <line x1="18" y1="38" x2="62" y2="38" stroke="#e4e4e7" strokeWidth="9" />
        </svg>
        <div className="absolute inset-x-0 top-0 h-0.5 bg-zinc-900/60 shadow-[0_0_8px_2px_rgba(0,0,0,0.3)]" style={{ animation: 'scan 2s ease-in-out infinite' }} />
        <style>{`@keyframes scan{0%{top:0%;opacity:1}90%{top:100%;opacity:1}100%{top:100%;opacity:0}}`}</style>
      </div>
      <div className="text-center space-y-2">
        <p className="text-sm font-medium text-zinc-900">{LOADING_TEXTS[textIdx]}</p>
        <div className="flex gap-1 justify-center">
          {[0, 1, 2].map((i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Result ───────────────────────────────────────────────────────────────────

function ResultView({ result, produto, onReset }: { result: ResultData; produto: ProdutoContext | null; onReset: () => void }) {
  const regionCards = [
    { label: 'Ombros', text: result.ombros, icon: '↔' },
    { label: 'Peito', text: result.peito, icon: '◎' },
    { label: 'Cintura', text: result.cintura, icon: '○' },
    { label: 'Quadril', text: result.quadril, icon: '◡' },
  ]

  return (
    <div className="max-w-2xl mx-auto px-5 py-10 space-y-8">
      {/* Product context */}
      {produto && (
        <div className="flex items-center gap-4 border border-zinc-200 p-4 bg-zinc-50">
          {produto.imagem && (
            <div className="w-14 flex-shrink-0 overflow-hidden bg-zinc-100">
              <img src={produto.imagem} alt={produto.nome} className="w-full object-cover" style={{ height: '72px' }} />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-zinc-400 mb-0.5">Resultado para</p>
            <p className="text-xs font-bold text-zinc-900 uppercase tracking-wide leading-snug line-clamp-2">{produto.nome}</p>
          </div>
        </div>
      )}

      {/* Shape badge */}
      <div className="text-center space-y-1">
        <span className="inline-block bg-zinc-900 text-white text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-1.5">
          {SHAPE_CONFIGS[result.avatar?.shape]?.label ?? result.shape}
        </span>
        <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-3 leading-relaxed">{result.descricaoShape}</p>
      </div>

      {/* Avatar + Size */}
      <div className="flex gap-8 items-center justify-center">
        <div className="w-32 h-48 flex-shrink-0">
          <BodyAvatar avatar={result.avatar} />
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-zinc-400 mb-1">
              {produto ? `Seu tamanho para esta peça` : 'Seu tamanho'}
            </p>
            <p className="text-6xl font-black text-zinc-900 leading-none">{result.tamanhoIdeal}</p>
          </div>
          {result.tamanhoAlternativo && (
            <div>
              <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-zinc-400 mb-0.5">Alternativo</p>
              <p className="text-2xl font-bold text-zinc-500">{result.tamanhoAlternativo}</p>
            </div>
          )}
        </div>
      </div>

      {/* Region cards */}
      <div className="grid grid-cols-2 gap-3">
        {regionCards.map((card) => (
          <div key={card.label} className="border border-zinc-200 p-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-lg text-zinc-400">{card.icon}</span>
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-zinc-500">{card.label}</span>
            </div>
            <p className="text-xs text-zinc-700 leading-relaxed">{card.text}</p>
          </div>
        ))}
      </div>

      {/* Style tip */}
      <div className="bg-zinc-50 border-l-2 border-zinc-900 px-5 py-4">
        <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-zinc-400 mb-2">Dica de estilo</p>
        <p className="text-sm text-zinc-700 leading-relaxed">{result.dicaGeral}</p>
      </div>

      {/* CTAs */}
      <div className="space-y-3">
        <Link href={`/produtos?tamanho=${result.tamanhoIdeal}`}>
          <button className="w-full bg-zinc-900 text-white text-xs font-bold tracking-[0.18em] uppercase py-4 hover:bg-zinc-700 transition-colors">
            Ver produtos no meu tamanho
          </button>
        </Link>
        <button
          onClick={onReset}
          className="w-full border border-zinc-300 text-zinc-700 text-xs font-bold tracking-[0.15em] uppercase py-3.5 hover:bg-zinc-50 transition-colors"
        >
          Refazer análise
        </button>
      </div>
    </div>
  )
}

// ─── Inner (needs useSearchParams) ───────────────────────────────────────────

function PageInner() {
  const params = useSearchParams()

  const produto: ProdutoContext | null = params.get('nome')
    ? {
        nome: params.get('nome') ?? '',
        categoria: params.get('categoria') ?? '',
        tamanhos: params.get('tamanhos') ? params.get('tamanhos')!.split(',') : [],
        imagem: params.get('imagem') ?? '',
      }
    : null

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ResultData | null>(null)
  const [error, setError] = useState('')

  const [altura, setAltura] = useState('')
  const [peso, setPeso] = useState('')
  const [ombro, setOmbro] = useState('')
  const [peito, setPeito] = useState('')
  const [cintura, setCintura] = useState('')
  const [quadril, setQuadril] = useState('')
  const [fotoFrente, setFotoFrente] = useState<string | null>(null)
  const [fotoLado, setFotoLado] = useState<string | null>(null)
  const [preferencia, setPreferencia] = useState<string | null>(null)
  const frenteRef = useRef<HTMLInputElement>(null)
  const ladoRef = useRef<HTMLInputElement>(null)

  const readPhoto = (file: File): Promise<string> =>
    new Promise((res) => {
      const reader = new FileReader()
      reader.onload = (e) => res(e.target?.result as string)
      reader.readAsDataURL(file)
    })

  const handlePhoto = useCallback(async (e: React.ChangeEvent<HTMLInputElement>, side: 'frente' | 'lado') => {
    const file = e.target.files?.[0]
    if (!file) return
    const b64 = await readPhoto(file)
    if (side === 'frente') setFotoFrente(b64)
    else setFotoLado(b64)
  }, [])

  const canContinueStep1 = altura.trim() !== '' && peso.trim() !== ''

  async function handleSubmit() {
    setLoading(true)
    setError('')
    try {
      const fotos = [fotoFrente, fotoLado].filter(Boolean) as string[]
      const res = await fetch('/api/ai/tamanho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          altura: Number(altura),
          peso: Number(peso),
          ombro: ombro ? Number(ombro) : null,
          peito: peito ? Number(peito) : null,
          cintura: cintura ? Number(cintura) : null,
          quadril: quadril ? Number(quadril) : null,
          fotos,
          produto: produto ?? undefined,
          preferencia: preferencia ?? undefined,
        }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setResult(data)
    } catch (err) {
      setError((err as Error).message ?? 'Erro ao processar')
      setStep(3)
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setStep(1)
    setResult(null)
    setError('')
    setAltura('')
    setPeso('')
    setOmbro('')
    setPeito('')
    setCintura('')
    setQuadril('')
    setFotoFrente(null)
    setFotoLado(null)
    setPreferencia(null)
  }

  if (!loading && result) {
    return (
      <main className="min-h-screen bg-white pt-24">
        <ResultView result={result} produto={produto} onReset={reset} />
      </main>
    )
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white pt-24">
        <LoadingScreen />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-xl mx-auto px-5">

        {/* ── Step 1 ── */}
        {step === 1 && (
          <div>
            <ProgressBar step={1} total={3} />


            <div className="mb-6">
              <h1 className="text-2xl font-black uppercase tracking-[0.08em] text-zinc-900 leading-tight mb-2">
                Encontre seu<br />tamanho ideal
              </h1>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Nossa IA analisa seu corpo com precisão para recomendar o tamanho perfeito.
              </p>
            </div>

            {/* Product banner if coming from product page */}
            {produto && <ProductBanner produto={produto} />}

            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { label: 'Altura (cm)', value: altura, set: setAltura, placeholder: '175' },
                { label: 'Peso (kg)', value: peso, set: setPeso, placeholder: '80' },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-zinc-500 mb-1.5">{f.label}</label>
                  <input type="number" value={f.value} onChange={(e) => f.set(e.target.value)} placeholder={f.placeholder}
                    className="w-full border border-zinc-300 px-3 py-3 text-sm text-zinc-900 placeholder-zinc-300 focus:outline-none focus:border-zinc-900" />
                </div>
              ))}
            </div>

            <div className="flex gap-6 mb-4">
              <div className="flex-1 space-y-4">
                {[
                  { label: 'Ombro (cm)', value: ombro, set: setOmbro, placeholder: '44' },
                  { label: 'Peito / Busto (cm)', value: peito, set: setPeito, placeholder: '96' },
                  { label: 'Cintura (cm)', value: cintura, set: setCintura, placeholder: '82' },
                  { label: 'Quadril (cm)', value: quadril, set: setQuadril, placeholder: '98' },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-zinc-500 mb-1.5">{f.label}</label>
                    <input type="number" value={f.value} onChange={(e) => f.set(e.target.value)} placeholder={f.placeholder}
                      className="w-full border border-zinc-300 px-3 py-3 text-sm text-zinc-900 placeholder-zinc-300 focus:outline-none focus:border-zinc-900" />
                  </div>
                ))}
              </div>
              <div className="w-28 flex-shrink-0">
                <MeasureIllustration />
              </div>
            </div>

            <p className="text-[11px] text-zinc-400 leading-relaxed mb-8">
              Como medir? Use uma fita métrica e meça em volta da parte mais larga de cada região.
            </p>

            <button onClick={() => setStep(2)} disabled={!canContinueStep1}
              className="w-full bg-zinc-900 text-white text-xs font-bold tracking-[0.18em] uppercase py-4 hover:bg-zinc-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
              Continuar
            </button>
          </div>
        )}

        {/* ── Step 2 ── */}
        {step === 2 && (
          <div>
            <ProgressBar step={2} total={3} />

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-black uppercase tracking-[0.08em] text-zinc-900 leading-tight">
                  Fotos para<br />maior precisão
                </h1>
                <span className="flex-shrink-0 text-[9px] font-bold tracking-[0.15em] uppercase text-emerald-700 border border-emerald-300 bg-emerald-50 px-2 py-0.5 h-fit">
                  Opcional
                </span>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {produto
                  ? `As fotos permitem que a IA analise como o ${produto.nome} vai cair no seu corpo especificamente.`
                  : 'As fotos permitem que a IA analise suas proporções reais — mas pode pular se preferir.'}
              </p>
            </div>

            {produto && <ProductBanner produto={produto} />}

            <div className="grid grid-cols-2 gap-4 mb-4">
              {([
                { label: 'Frente', ref: frenteRef, foto: fotoFrente, side: 'frente' as const },
                { label: 'Lado', ref: ladoRef, foto: fotoLado, side: 'lado' as const },
              ]).map((card) => (
                <div key={card.label}>
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-zinc-500 mb-1.5">{card.label}</p>
                  <button onClick={() => card.ref.current?.click()}
                    className="w-full aspect-[3/4] border-2 border-dashed border-zinc-200 hover:border-zinc-400 transition-colors flex flex-col items-center justify-center gap-3 relative overflow-hidden">
                    {card.foto ? (
                      <img src={card.foto} alt={card.label} className="w-full h-full object-cover absolute inset-0" />
                    ) : (
                      <>
                        <svg viewBox="0 0 80 120" className="w-12 h-16 opacity-10" fill="none">
                          <circle cx="40" cy="16" r="12" fill="#18181b" />
                          <rect x="33" y="27" width="14" height="9" rx="3" fill="#18181b" />
                          <path d="M18 38 C18 52 24 68 25 80 C26 88 26 92 26 98 L22 118 M62 38 C62 52 56 68 55 80 C54 88 54 92 54 98 L58 118" stroke="#18181b" strokeWidth="9" strokeLinecap="round" fill="none"/>
                          <line x1="18" y1="38" x2="62" y2="38" stroke="#18181b" strokeWidth="9" />
                        </svg>
                        <div className="text-center">
                          <svg className="h-5 w-5 text-zinc-300 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                          </svg>
                          <p className="text-[10px] text-zinc-400">Clique para enviar</p>
                        </div>
                      </>
                    )}
                  </button>
                  <input ref={card.ref} type="file" accept="image/*" className="hidden" onChange={(e) => handlePhoto(e, card.side)} />
                </div>
              ))}
            </div>

            <p className="text-[11px] text-zinc-400 leading-relaxed mb-4">
              Suas fotos são processadas localmente e não são armazenadas em nossos servidores.
            </p>

            {error && <p className="text-xs text-red-600 mb-4 text-center">{error}</p>}

            <div className="space-y-3">
              <button onClick={() => setStep(3)}
                className="w-full bg-zinc-900 text-white text-xs font-bold tracking-[0.18em] uppercase py-4 hover:bg-zinc-700 transition-colors">
                Continuar
              </button>
              <button onClick={() => setStep(3)}
                className="w-full border border-zinc-300 text-zinc-700 text-xs font-bold tracking-[0.15em] uppercase py-3.5 hover:bg-zinc-50 transition-colors">
                Pular esta etapa
              </button>
              <button onClick={() => setStep(1)}
                className="w-full text-center text-xs text-zinc-400 hover:text-zinc-700 transition-colors py-1">
                ← Voltar
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3 — Caimento ── */}
        {step === 3 && (
          <div>
            <ProgressBar step={3} total={3} />

            <div className="mb-8">
              <h1 className="text-2xl font-black uppercase tracking-[0.08em] text-zinc-900 leading-tight mb-2">
                Como você quer<br />que fique em você?
              </h1>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {produto
                  ? `Diga como quer que o ${produto.nome} vista no seu corpo.`
                  : 'A IA vai considerar sua preferência de caimento na recomendação.'}
              </p>
            </div>

            {produto && <ProductBanner produto={produto} />}

            <div className="space-y-3 mb-8">
              {[
                {
                  id: 'oversized',
                  label: 'Oversized',
                  desc: 'Bem largo, caindo além dos ombros — visual streetwear',
                  svg: (
                    <svg viewBox="0 0 40 56" className="w-8 h-10" fill="none">
                      <circle cx="20" cy="7" r="5" fill="currentColor" />
                      <path d="M6 16 C6 24 10 32 10 38 C10 44 9 48 8 54 M34 16 C34 24 30 32 30 38 C30 44 31 48 32 54" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                      <line x1="6" y1="16" x2="34" y2="16" stroke="currentColor" strokeWidth="5" />
                    </svg>
                  ),
                },
                {
                  id: 'folgado',
                  label: 'Folgado',
                  desc: 'Com bastante espaço, sem marcar o corpo — confortável',
                  svg: (
                    <svg viewBox="0 0 40 56" className="w-8 h-10" fill="none">
                      <circle cx="20" cy="7" r="5" fill="currentColor" />
                      <path d="M9 16 C9 24 12 32 12 38 C12 44 11 48 10 54 M31 16 C31 24 28 32 28 38 C28 44 29 48 30 54" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                      <line x1="9" y1="16" x2="31" y2="16" stroke="currentColor" strokeWidth="5" />
                    </svg>
                  ),
                },
                {
                  id: 'regular',
                  label: 'Regular',
                  desc: 'Caimento clássico — nem apertado, nem largo demais',
                  svg: (
                    <svg viewBox="0 0 40 56" className="w-8 h-10" fill="none">
                      <circle cx="20" cy="7" r="5" fill="currentColor" />
                      <path d="M12 16 C12 24 14 32 14 38 C14 44 13 48 12 54 M28 16 C28 24 26 32 26 38 C26 44 27 48 28 54" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                      <line x1="12" y1="16" x2="28" y2="16" stroke="currentColor" strokeWidth="5" />
                    </svg>
                  ),
                },
                {
                  id: 'slim',
                  label: 'Slim',
                  desc: 'Mais próximo do corpo, valorizando o shape — moderno',
                  svg: (
                    <svg viewBox="0 0 40 56" className="w-8 h-10" fill="none">
                      <circle cx="20" cy="7" r="5" fill="currentColor" />
                      <path d="M14 16 C14 22 15 30 15 36 C15 42 14 48 13 54 M26 16 C26 22 25 30 25 36 C25 42 26 48 27 54" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                      <line x1="14" y1="16" x2="26" y2="16" stroke="currentColor" strokeWidth="5" />
                    </svg>
                  ),
                },
                {
                  id: 'justo',
                  label: 'Justo',
                  desc: 'Bem colado ao corpo — segunda pele, máxima definição',
                  svg: (
                    <svg viewBox="0 0 40 56" className="w-8 h-10" fill="none">
                      <circle cx="20" cy="7" r="5" fill="currentColor" />
                      <path d="M16 16 C16 22 17 30 17 36 C17 42 16 48 16 54 M24 16 C24 22 23 30 23 36 C23 42 24 48 24 54" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                      <line x1="16" y1="16" x2="24" y2="16" stroke="currentColor" strokeWidth="5" />
                    </svg>
                  ),
                },
              ].map((opt) => {
                const active = preferencia === opt.id
                return (
                  <button
                    key={opt.id}
                    onClick={() => setPreferencia(active ? null : opt.id)}
                    className={`w-full flex items-center gap-4 px-4 py-4 border-2 text-left transition-all ${active ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-200 hover:border-zinc-400'}`}
                  >
                    <div className={`flex-shrink-0 transition-colors ${active ? 'text-zinc-900' : 'text-zinc-300'}`}>
                      {opt.svg}
                    </div>
                    <div className="min-w-0">
                      <p className={`text-xs font-bold uppercase tracking-[0.12em] mb-0.5 ${active ? 'text-zinc-900' : 'text-zinc-700'}`}>
                        {opt.label}
                      </p>
                      <p className="text-[11px] text-zinc-400 leading-snug">{opt.desc}</p>
                    </div>
                    <div className={`ml-auto flex-shrink-0 w-4 h-4 rounded-full border-2 transition-all ${active ? 'border-zinc-900 bg-zinc-900' : 'border-zinc-300'}`} />
                  </button>
                )
              })}
            </div>

            {error && <p className="text-xs text-red-600 mb-4 text-center">{error}</p>}

            <div className="space-y-3">
              <button
                onClick={handleSubmit}
                className="w-full bg-zinc-900 text-white text-xs font-bold tracking-[0.18em] uppercase py-4 hover:bg-zinc-700 transition-colors"
              >
                {preferencia ? 'Gerar minha análise' : 'Gerar análise'}
              </button>
              <button onClick={() => setStep(2)}
                className="w-full text-center text-xs text-zinc-400 hover:text-zinc-700 transition-colors py-1">
                ← Voltar
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function EncontreSeuTamanhoPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-white pt-24" />}>
      <PageInner />
    </Suspense>
  )
}
