import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import type { StreamingEventsByFiscalYear } from '../../types/streaming'
import { formatNumber } from '../../utils/formatters'

interface StreamingEventsChartProps {
  data: StreamingEventsByFiscalYear[]
}

interface TooltipPayload {
  payload?: StreamingEventsByFiscalYear
}

interface StreamingTooltipProps {
  active?: boolean
  payload?: TooltipPayload[]
}

function StreamingTooltip({
  active,
  payload,
}: StreamingTooltipProps) {
  const item = payload?.[0]?.payload

  if (!active || !item) {
    return null
  }

  return (
    <div className="chart-tooltip">
      <strong>FY {item.fiscal_year}</strong>
      <span>{formatNumber(item.event_count)} events</span>
    </div>
  )
}

export function StreamingEventsChart({
  data,
}: StreamingEventsChartProps) {
  return (
    <article className="chart-card streaming-chart-card">
      <div className="chart-card__header">
        <div>
          <p className="chart-card__eyebrow">Event Distribution</p>
          <h2>Streaming Events by Fiscal Year</h2>
          <p>
            Event volume across the available fiscal-year range.
          </p>
        </div>
      </div>

      <div className="streaming-chart-card__body">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 8,
              right: 12,
              bottom: 0,
              left: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="fiscal_year"
              tickLine={false}
              axisLine={false}
              minTickGap={20}
            />

            <YAxis
              tickFormatter={(value: number) =>
                formatNumber(value)
              }
              tickLine={false}
              axisLine={false}
              width={56}
            />

            <Tooltip content={<StreamingTooltip />} />

            <Bar
              dataKey="event_count"
              fill="currentColor"
              radius={[6, 6, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  )
}