import { useMemo } from 'react'
import {
  Activity,
  Building2,
  CircleDollarSign,
  Users,
} from 'lucide-react'

import { HorizontalBarChart } from '../components/charts/HorizontalBarChart'
import { StreamingEventsChart } from '../components/charts/StreamingEventsChart'
import { KpiCard } from '../components/common/KpiCard'
import {
  useStreamingDepartmentSummaryQuery,
  useStreamingSummaryQuery,
} from '../features/streaming-validation/queries'
import { getTopStreamingDepartments } from '../features/streaming-validation/selectors'
import {
  formatCompactCurrency,
  formatNumber,
} from '../utils/formatters'

export function StreamingValidationPage() {
  const summaryQuery = useStreamingSummaryQuery()
  const departmentsQuery =
    useStreamingDepartmentSummaryQuery()

  const topDepartments = useMemo(() => {
    return getTopStreamingDepartments(
      departmentsQuery.data?.data ?? [],
    )
  }, [departmentsQuery.data])

  if (summaryQuery.isPending) {
    return (
      <section className="dashboard-state">
        <h1>Streaming & Validation</h1>
        <p>Loading streaming analytics...</p>
      </section>
    )
  }

  if (summaryQuery.isError) {
    return (
      <section className="dashboard-state">
        <h1>Streaming & Validation</h1>
        <p role="alert">
          Unable to load streaming analytics.
        </p>
      </section>
    )
  }

  const summary = summaryQuery.data

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <p className="page-eyebrow">Streaming Analytics</p>
          <h1>Streaming & Validation</h1>
          <p>
            Event-level payment analytics and streaming data
            validation results.
          </p>
        </div>

        <div className="streaming-range">
          <span>Fiscal-Year Range</span>
          <strong>
            FY {summary.minimum_fiscal_year}–
            {summary.maximum_fiscal_year}
          </strong>
        </div>
      </header>

      <section
        className="streaming-kpi-grid"
        aria-label="Streaming metrics"
      >
        <KpiCard
          title="Total Events"
          value={formatNumber(summary.total_events)}
          supportingText="Events processed from streaming data"
          icon={Activity}
        />

        <KpiCard
          title="Total Payment Amount"
          value={formatCompactCurrency(
            summary.total_payment_amount,
          )}
          supportingText="Combined payment amount"
          icon={CircleDollarSign}
        />

        <KpiCard
          title="Unique Departments"
          value={formatNumber(summary.unique_departments)}
          supportingText="Departments represented"
          icon={Building2}
        />

        <KpiCard
          title="Unique Suppliers"
          value={formatNumber(summary.unique_suppliers)}
          supportingText="Suppliers represented"
          icon={Users}
        />
      </section>

      <section className="streaming-charts-grid">
        <StreamingEventsChart
          data={summary.events_by_fiscal_year}
        />

        {departmentsQuery.isPending ? (
          <article className="chart-card">
            <div className="chart-card__header">
              <div>
                <h2>
                  Top Departments by Payment Amount
                </h2>
                <p>Loading department analytics...</p>
              </div>
            </div>
          </article>
        ) : null}

        {departmentsQuery.isError ? (
          <article className="chart-card">
            <div className="chart-card__header">
              <div>
                <h2>
                  Top Departments by Payment Amount
                </h2>
                <p role="alert">
                  Unable to load department analytics.
                </p>
              </div>
            </div>
          </article>
        ) : null}

        {departmentsQuery.data ? (
          <HorizontalBarChart
            title="Top 10 Departments by Payment Amount"
            description="Departments with the highest streaming payment totals."
            data={topDepartments.map((item) => ({
              label: item.department,
              value: item.total_payment_amount,
            }))}
            valueLabel="Payment Amount"
          />
        ) : null}
      </section>

      <section className="validation-card">
        <div>
          <p className="chart-card__eyebrow">
            Validation Status
          </p>
          <h2>Deduplication Validation</h2>
          <p>
            Streaming events expose a dedup status field. Aggregate dedup
            counts are not currently provided by the API, so this application
            reports source connectivity without inferring a full-dataset pass rate.
          </p>
        </div>

        <div className="validation-card__status">
          <span className="status-dot" />
          <strong>Streaming source connected</strong>
        </div>
      </section>
    </div>
  )
}