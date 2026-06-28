import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { formatCompactCurrency } from '../../utils/formatters'

interface HorizontalBarChartDatum {
  label: string
  value: number
}

interface HorizontalBarChartProps {
  title: string
  description: string
  data: HorizontalBarChartDatum[]
  valueLabel: string
}

interface TooltipPayload {
  value?: number
  payload?: HorizontalBarChartDatum
}

interface ChartTooltipProps {
  active?: boolean
  payload?: TooltipPayload[]
}

function ChartTooltip({
  active,
  payload,
  valueLabel,
}: ChartTooltipProps & { valueLabel: string }) {
  if (!active || !payload?.length) {
    return null
  }

  const item = payload[0]?.payload

  if (!item) {
    return null
  }

  return (
    <div className="chart-tooltip">
      <strong>{item.label}</strong>
      <span>
        {valueLabel}: {formatCompactCurrency(item.value)}
      </span>
    </div>
  )
}

function truncateLabel(value: string): string {
  return value.length > 24 ? `${value.slice(0, 24)}…` : value
}

export function HorizontalBarChart({
  title,
  description,
  data,
  valueLabel,
}: HorizontalBarChartProps) {
  return (
    <article className="chart-card analytics-chart-card">
      <div className="chart-card__header">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      <div className="analytics-chart-card__body">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 8,
              right: 8,
              bottom: 8,
              left: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              horizontal={false}
            />

            <XAxis
              type="number"
              tickFormatter={(value: number) =>
                formatCompactCurrency(value)
              }
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              type="category"
              dataKey="label"
              tickFormatter={truncateLabel}
              tickLine={false}
              axisLine={false}
              width={120}
            />

            <Tooltip
              content={
                <ChartTooltip valueLabel={valueLabel} />
              }
            />

            <Bar
              dataKey="value"
              fill="currentColor"
              radius={[0, 6, 6, 0]}
              maxBarSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  )
}