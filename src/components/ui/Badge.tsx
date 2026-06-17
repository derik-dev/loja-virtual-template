type BadgeVariant = 'default' | 'sale' | 'new' | 'soldout'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-700',
  sale: 'bg-red-100 text-red-700',
  new: 'bg-green-100 text-green-700',
  soldout: 'bg-slate-200 text-slate-400',
}

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold',
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  )
}

export default Badge
