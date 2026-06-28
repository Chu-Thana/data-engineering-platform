import { apiGet } from '../../api/client'
import { API_ENDPOINTS } from '../../api/endpoints'
import type {
  SpendingByDepartmentResponse,
  TopSuppliersResponse,
} from '../../types/batch'

export function getSpendingByDepartment(
  fiscalYear: number,
  signal?: AbortSignal,
): Promise<SpendingByDepartmentResponse> {
  const searchParams = new URLSearchParams({
    fiscal_year: String(fiscalYear),
    limit: '100',
    offset: '0',
  })

  return apiGet<SpendingByDepartmentResponse>(
    `${API_ENDPOINTS.batch.spendingByDepartment}?${searchParams.toString()}`,
    signal,
  )
}

export function getTopSuppliers(
  signal?: AbortSignal,
): Promise<TopSuppliersResponse> {
  const searchParams = new URLSearchParams({
    limit: '10',
    offset: '0',
  })

  return apiGet<TopSuppliersResponse>(
    `${API_ENDPOINTS.batch.topSuppliers}?${searchParams.toString()}`,
    signal,
  )
}