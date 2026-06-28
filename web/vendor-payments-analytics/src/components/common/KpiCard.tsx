import type { LucideIcon } from 'lucide-react'

interface KpiCardProps {
  title: string
  value: string
  supportingText?: string
  icon: LucideIcon
  trend?: 'positive' | 'negative' | 'neutral'
}

export function KpiCard({
  title,
  value,
  supportingText,
  icon: Icon,
  trend = 'neutral',
}: KpiCardProps) {
  return (
    <article className="kpi-card">
      <div className="kpi-card__header">
        <span>{title}</span>

        <div className="kpi-card__icon">
          <Icon aria-hidden="true" size={20} />
        </div>
      </div>

      <strong>{value}</strong>

      {supportingText ? (
        <p className={`kpi-card__support kpi-card__support--${trend}`}>
          {supportingText}
        </p>
      ) : null}
    </article>
  )
}