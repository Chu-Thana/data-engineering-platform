import { useQuery } from '@tanstack/react-query'

import {
  getSpendingByDepartment,
  getTopSuppliers,
} from './api'

export const departmentSupplierQueryKeys = {
  all: ['department-supplier'] as const,

  departments: (fiscalYear: number) =>
    [
      ...departmentSupplierQueryKeys.all,
      'departments',
      fiscalYear,
    ] as const,

  topSuppliers: () =>
    [
      ...departmentSupplierQueryKeys.all,
      'top-suppliers',
    ] as const,
}

export function useSpendingByDepartmentQuery(
  fiscalYear: number,
) {
  return useQuery({
    queryKey:
      departmentSupplierQueryKeys.departments(fiscalYear),
    queryFn: ({ signal }) =>
      getSpendingByDepartment(fiscalYear, signal),
  })
}

export function useTopSuppliersQuery() {
  return useQuery({
    queryKey: departmentSupplierQueryKeys.topSuppliers(),
    queryFn: ({ signal }) => getTopSuppliers(signal),
  })
}