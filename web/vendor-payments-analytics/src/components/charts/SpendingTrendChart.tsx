import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import type { FiscalYearSpending } from '../../types/batch'
import { formatCompactCurrency } from '../../utils/formatters'

interface SpendingTrendChartProps {
  data: FiscalYearSpending[]
  selectedFiscalYear: number
}

interface TooltipPayload {
  value?: number
  payload?: FiscalYearSpending
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayload[]
  label?: number
}

function SpendingTooltip({
  active,
  payload,
  label,
}: CustomTooltipProps) {
  if (!active || !payload?.length) {
    return null
  }

  const record = payload[0]?.payload

  if (!record) {
    return null
  }

  return (
    <div className="chart-tooltip">
      <strong>FY {label}</strong>
      <span>
        Paid: {formatCompactCurrency(record.total_vouchers_paid)}
      </span>
      <span>
        Pending: {formatCompactCurrency(record.total_vouchers_pending)}
      </span>
    </div>
  )
}

export function SpendingTrendChart({
  data,
  selectedFiscalYear,
}: SpendingTrendChartProps) {
  return (
    <article className="chart-card">
      <div className="chart-card__header">
        <div>
          <p className="chart-card__eyebrow">20-Year Trend</p>
          <h2>Spending by Fiscal Year</h2>
          <p>
            Paid voucher amounts across all available fiscal years.
          </p>
        </div>

        <span className="chart-card__badge">
          Selected: FY {selectedFiscalYear}
        </span>
      </div>

      <div className="chart-card__body">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 12,
              right: 12,
              left: 4,
              bottom: 0,
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
              minTickGap={24}
            />

            <YAxis
              tickFormatter={(value: number) =>
                formatCompactCurrency(value)
              }
              tickLine={false}
              axisLine={false}
              width={78}
            />

            <Tooltip content={<SpendingTooltip />} />

            <Line
              type="monotone"
              dataKey="total_vouchers_paid"
              stroke="currentColor"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </article>
  )
}