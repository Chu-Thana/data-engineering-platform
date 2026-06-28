import { useMemo, useState } from 'react'

import { useSpendingByFiscalYearQuery } from '../features/executive-overview/queries'
import {
  useSpendingByDepartmentQuery,
  useTopSuppliersQuery,
} from '../features/department-supplier/queries'
import {
  getSpendingByOrganizationGroup,
  getTopDepartmentsByPendingPayments,
  getTopDepartmentsBySpending,
} from '../features/department-supplier/selectors'

import { HorizontalBarChart } from '../components/charts/HorizontalBarChart'


export function DepartmentSupplierPage() {
  const fiscalYearQuery = useSpendingByFiscalYearQuery()
  const [selectedYear, setSelectedYear] = useState<number | null>(
    null,
  )

  const fiscalYears = useMemo(() => {
    if (!fiscalYearQuery.data) {
      return []
    }

    return [...fiscalYearQuery.data.data].sort(
      (first, second) =>
        first.fiscal_year - second.fiscal_year,
    )
  }, [fiscalYearQuery.data])

  const latestFiscalYear =
    fiscalYears.at(-1)?.fiscal_year ?? 2026

  const activeFiscalYear =
    selectedYear ?? latestFiscalYear

  const departmentsQuery =
    useSpendingByDepartmentQuery(activeFiscalYear)
  
  const topSuppliersQuery = useTopSuppliersQuery()

  const departmentAnalytics = useMemo(() => {
    const departments = departmentsQuery.data?.data ?? []

    return {
      topSpending:
        getTopDepartmentsBySpending(departments),

      topPending:
        getTopDepartmentsByPendingPayments(departments),

      organizationGroups:
        getSpendingByOrganizationGroup(departments),
    }
  }, [departmentsQuery.data])

  if (fiscalYearQuery.isPending) {
    return (
      <section className="dashboard-state">
        <h1>Department & Supplier Analysis</h1>
        <p>Loading fiscal-year options...</p>
      </section>
    )
  }

  if (fiscalYearQuery.isError) {
    return (
      <section className="dashboard-state">
        <h1>Department & Supplier Analysis</h1>
        <p role="alert">
          Unable to load fiscal-year data.
        </p>
      </section>
    )
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <p className="page-eyebrow">Batch Analytics</p>
          <h1>Department & Supplier Analysis</h1>
          <p>
            Department spending, pending payments,
            organization groups, and supplier rankings.
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
            {[...fiscalYears].reverse().map((item) => (
              <option
                key={item.fiscal_year}
                value={item.fiscal_year}
              >
                FY {item.fiscal_year}
              </option>
            ))}
          </select>
        </label>
      </header>

      {departmentsQuery.isPending ? (
        <section className="dashboard-state">
          <p>
            Loading department analytics for FY{' '}
            {activeFiscalYear}...
          </p>
        </section>
      ) : null}

      {departmentsQuery.isError ? (
        <section className="dashboard-state">
          <p role="alert">
            Unable to load department analytics.
          </p>
        </section>
      ) : null}

      {departmentsQuery.data ? (
        <section className="department-charts-grid">
          <HorizontalBarChart
            title="Top 10 Departments by Spending"
            description={`Highest paid voucher totals in FY ${activeFiscalYear}.`}
            data={departmentAnalytics.topSpending.map((item) => ({
              label: item.department,
              value: item.total_vouchers_paid,
            }))}
            valueLabel="Paid"
          />

          <HorizontalBarChart
            title="Top 10 Departments by Pending Payments"
            description={`Highest pending voucher totals in FY ${activeFiscalYear}.`}
            data={departmentAnalytics.topPending.map((item) => ({
              label: item.department,
              value: item.total_vouchers_pending,
            }))}
            valueLabel="Pending"
          />

          <HorizontalBarChart
            title="Spending by Organization Group"
            description={`Paid voucher totals aggregated by organization group in FY ${activeFiscalYear}.`}
            data={departmentAnalytics.organizationGroups.map((item) => ({
              label: item.organization_group,
              value: item.total_vouchers_paid,
            }))}
            valueLabel="Paid"
          />

        {topSuppliersQuery.isPending ? (
          <article className="chart-card supplier-placeholder-card">
            <div className="chart-card__header">
              <div>
                <h2>All-Time Top 10 Suppliers by Spending</h2>
                <p>Loading supplier rankings...</p>
              </div>
            </div>
          </article>
        ) : null}

        {topSuppliersQuery.isError ? (
          <article className="chart-card supplier-placeholder-card">
            <div className="chart-card__header">
              <div>
                <h2>All-Time Top 10 Suppliers by Spending</h2>
                <p role="alert">
                  Unable to load supplier rankings.
                </p>
              </div>
            </div>
          </article>
        ) : null}

        {topSuppliersQuery.data ? (
          <HorizontalBarChart
            title="All-Time Top 10 Suppliers by Spending"
            description="Highest paid voucher totals across all fiscal years."
            data={topSuppliersQuery.data.data.map((item) => ({
              label: item.supplier_name,
              value: item.total_vouchers_paid,
            }))}
            valueLabel="Paid"
          />
        ) : null}
        </section>
      ) : null}
    </div>
  )
}