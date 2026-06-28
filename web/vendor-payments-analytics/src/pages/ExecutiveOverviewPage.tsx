import { useMemo, useState } from 'react'
import {
  Building2,
  CalendarDays,
  CircleDollarSign,
  ReceiptText,
  TrendingUp,
  Users,
} from 'lucide-react'

import { KpiCard } from '../components/common/KpiCard'
import { SpendingTrendChart } from '../components/charts/SpendingTrendChart'
import {
  useDepartmentCountQuery,
  useSpendingByFiscalYearQuery,
} from '../features/executive-overview/queries'

import {
  formatCompactCurrency,
  formatNumber,
  formatPercentage,
} from '../utils/formatters'

export function ExecutiveOverviewPage() {
  const spendingQuery = useSpendingByFiscalYearQuery()
  const [selectedYear, setSelectedYear] = useState<number | null>(null)

  const fiscalYearData = useMemo(() => {
    if (!spendingQuery.data) {
      return []
    }

    return [...spendingQuery.data.data].sort(
      (first, second) => first.fiscal_year - second.fiscal_year,
    )
  }, [spendingQuery.data])

  const latestFiscalYear = fiscalYearData.at(-1)?.fiscal_year ?? null
  const activeFiscalYear = selectedYear ?? latestFiscalYear
  const departmentCountQuery =
    useDepartmentCountQuery(activeFiscalYear)

  const selectedYearData = fiscalYearData.find(
    (item) => item.fiscal_year === activeFiscalYear,
  )

  const previousYearData = fiscalYearData.find(
    (item) => item.fiscal_year === (activeFiscalYear ?? 0) - 1,
  )

  const yearOverYearChange =
    selectedYearData &&
    previousYearData &&
    previousYearData.total_vouchers_paid !== 0
      ? ((selectedYearData.total_vouchers_paid -
          previousYearData.total_vouchers_paid) /
          previousYearData.total_vouchers_paid) *
        100
      : null

  const yearOverYearTrend =
    yearOverYearChange === null
      ? 'neutral'
      : yearOverYearChange >= 0
        ? 'positive'
        : 'negative'

  if (spendingQuery.isPending) {
    return (
      <section className="dashboard-state">
        <h1>Executive Overview</h1>
        <p>Loading fiscal-year spending data...</p>
      </section>
    )
  }

  if (spendingQuery.isError) {
    return (
      <section className="dashboard-state">
        <h1>Executive Overview</h1>
        <p role="alert">
          Unable to load data from the Vendor Payments API.
        </p>
      </section>
    )
  }

  if (!selectedYearData || activeFiscalYear === null) {
    return (
      <section className="dashboard-state">
        <h1>Executive Overview</h1>
        <p>No fiscal-year spending data is available.</p>
      </section>
    )
  }

  return (
      <div className="dashboard-page">
        <header className="dashboard-header">
          <div>
            <p className="page-eyebrow">Batch Analytics</p>
            <h1>Executive Overview</h1>
            <p>
              Overall vendor payment performance and fiscal-year trends.
            </p>
          </div>

          <label className="fiscal-year-filter">
            <span>Fiscal Year</span>

            <select
              value={activeFiscalYear}
              onChange={(event) => {
                setSelectedYear(Number(event.target.value))
              }}
            >
              {[...fiscalYearData].reverse().map((item) => (
                <option key={item.fiscal_year} value={item.fiscal_year}>
                  FY {item.fiscal_year}
                </option>
              ))}
            </select>
          </label>
        </header>

        <section className="kpi-grid" aria-label="Executive metrics">
          <KpiCard
            title="Selected Fiscal Year"
            value={`FY ${activeFiscalYear}`}
            supportingText={`${fiscalYearData.length} fiscal years available`}
            icon={CalendarDays}
          />

          <KpiCard
            title="Total Spending"
            value={formatCompactCurrency(
              selectedYearData.total_vouchers_paid,
            )}
            supportingText={`${formatNumber(
              selectedYearData.record_count,
            )} payment records`}
            icon={CircleDollarSign}
          />

          <KpiCard
            title="Previous-Year Spending"
            value={
              previousYearData
                ? formatCompactCurrency(
                    previousYearData.total_vouchers_paid,
                  )
                : '—'
            }
            supportingText={
              previousYearData
                ? `FY ${previousYearData.fiscal_year}`
                : 'No previous-year data'
            }
            icon={ReceiptText}
          />

          <KpiCard
            title="Year-over-Year Change"
            value={
              yearOverYearChange === null
                ? '—'
                : formatPercentage(yearOverYearChange)
            }
            supportingText={
              yearOverYearChange === null
                ? 'Comparison unavailable'
                : yearOverYearChange >= 0
                  ? 'Increase from previous year'
                  : 'Decrease from previous year'
            }
            icon={TrendingUp}
            trend={yearOverYearTrend}
          />

          <KpiCard
            title="Total Departments"
            value={
              departmentCountQuery.isPending
                ? '...'
                : departmentCountQuery.isError
                  ? '—'
                  : formatNumber(departmentCountQuery.data.total_count)
            }
            supportingText={
              departmentCountQuery.isError
                ? 'Department data unavailable'
                : `Departments in FY ${activeFiscalYear}`
            }
            icon={Building2}
          />

          <KpiCard
            title="Unique Suppliers"
            value={formatNumber(selectedYearData.unique_suppliers)}
            supportingText="Suppliers in selected fiscal year"
            icon={Users}
          />
        </section>

        <section className="dashboard-grid">
          <SpendingTrendChart
            data={fiscalYearData}
            selectedFiscalYear={activeFiscalYear}
          />

          <article className="summary-card">
            <div className="summary-card__header">
              <div>
                <p className="chart-card__eyebrow">
                  Selected Fiscal Year
                </p>
                <h2>Pending Payment Summary</h2>
              </div>
            </div>

            <dl className="summary-list">
              <div>
                <dt>Pending Vouchers</dt>
                <dd>
                  {formatCompactCurrency(
                    selectedYearData.total_vouchers_pending,
                  )}
                </dd>
              </div>

              <div>
                <dt>Pending Retainage</dt>
                <dd>
                  {formatCompactCurrency(
                    selectedYearData.total_pending_retainage,
                  )}
                </dd>
              </div>

              <div>
                <dt>Encumbrance Balance</dt>
                <dd>
                  {formatCompactCurrency(
                    selectedYearData.total_encumbrance_balance,
                  )}
                </dd>
              </div>

              <div>
                <dt>Large Paid Records</dt>
                <dd>
                  {formatNumber(
                    selectedYearData.large_paid_1m_records,
                  )}
                </dd>
              </div>
            </dl>
          </article>
        </section>
      </div>
    )
}
