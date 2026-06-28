import { apiGet } from '../../api/client'
import { API_ENDPOINTS } from '../../api/endpoints'
import type {
  SpendingByDepartmentResponse,
  SpendingByFiscalYearResponse,
} from '../../types/batch'

export function getSpendingByFiscalYear(
  signal?: AbortSignal,
): Promise<SpendingByFiscalYearResponse> {
  return apiGet<SpendingByFiscalYearResponse>(
    API_ENDPOINTS.batch.spendingByFiscalYear,
    signal,
  )
}

export function getDepartmentCountByFiscalYear(
  fiscalYear: number,
  signal?: AbortSignal,
): Promise<SpendingByDepartmentResponse> {
  const searchParams = new URLSearchParams({
    fiscal_year: String(fiscalYear),
    limit: '1',
    offset: '0',
  })

  return apiGet<SpendingByDepartmentResponse>(
    `${API_ENDPOINTS.batch.spendingByDepartment}?${searchParams.toString()}`,
    signal,
  )
}