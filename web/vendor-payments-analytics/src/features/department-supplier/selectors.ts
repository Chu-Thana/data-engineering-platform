import type { DepartmentSpending } from '../../types/batch'

export interface OrganizationGroupSpending {
  organization_group: string
  total_vouchers_paid: number
}

export function getTopDepartmentsBySpending(
  departments: DepartmentSpending[],
  limit = 10,
): DepartmentSpending[] {
  return [...departments]
    .sort(
      (first, second) =>
        second.total_vouchers_paid -
        first.total_vouchers_paid,
    )
    .slice(0, limit)
}

export function getTopDepartmentsByPendingPayments(
  departments: DepartmentSpending[],
  limit = 10,
): DepartmentSpending[] {
  return [...departments]
    .sort(
      (first, second) =>
        second.total_vouchers_pending -
        first.total_vouchers_pending,
    )
    .slice(0, limit)
}

export function getSpendingByOrganizationGroup(
  departments: DepartmentSpending[],
): OrganizationGroupSpending[] {
  const totals = new Map<string, number>()

  departments.forEach((department) => {
    const currentTotal =
      totals.get(department.organization_group) ?? 0

    totals.set(
      department.organization_group,
      currentTotal + department.total_vouchers_paid,
    )
  })

  return Array.from(totals, ([organization_group, total]) => ({
    organization_group,
    total_vouchers_paid: total,
  })).sort(
    (first, second) =>
      second.total_vouchers_paid -
      first.total_vouchers_paid,
  )
}