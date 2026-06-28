import { useQuery } from '@tanstack/react-query'

import {
  getDepartmentCountByFiscalYear,
  getSpendingByFiscalYear,
} from './api'

export const executiveOverviewQueryKeys = {
  all: ['executive-overview'] as const,

  spendingByFiscalYear: () =>
    [...executiveOverviewQueryKeys.all, 'spending-by-fiscal-year'] as const,

  departmentCount: (fiscalYear: number) =>
    [
      ...executiveOverviewQueryKeys.all,
      'department-count',
      fiscalYear,
    ] as const,
}

export function useSpendingByFiscalYearQuery() {
  return useQuery({
    queryKey: executiveOverviewQueryKeys.spendingByFiscalYear(),
    queryFn: ({ signal }) => getSpendingByFiscalYear(signal),
  })
}

export function useDepartmentCountQuery(
  fiscalYear: number | null,
) {
  return useQuery({
    queryKey: executiveOverviewQueryKeys.departmentCount(
      fiscalYear ?? 0,
    ),
    queryFn: ({ signal }) =>
      getDepartmentCountByFiscalYear(
        fiscalYear as number,
        signal,
      ),
    enabled: fiscalYear !== null,
  })
}