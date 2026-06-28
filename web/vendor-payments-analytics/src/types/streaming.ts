import type { PaginatedApiResponse } from './common'

export interface StreamingEventsByFiscalYear {
  fiscal_year: number
  event_count: number
}

export interface StreamingSummaryResponse {
  total_events: number
  total_payment_amount: number
  unique_departments: number
  unique_suppliers: number
  minimum_fiscal_year: number
  maximum_fiscal_year: number
  events_by_fiscal_year: StreamingEventsByFiscalYear[]
}

export interface StreamingDepartmentSummary {
  department: string
  event_count: number
  total_payment_amount: number
  unique_suppliers: number
  minimum_fiscal_year: number
  maximum_fiscal_year: number
}

export type StreamingDepartmentSummaryResponse =
  PaginatedApiResponse<StreamingDepartmentSummary>