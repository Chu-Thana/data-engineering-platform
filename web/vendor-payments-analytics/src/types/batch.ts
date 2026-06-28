import type {
  ApiListResponse,
  PaginatedApiResponse,
} from './common'

export interface FiscalYearSpending {
  fiscal_year: number
  total_vouchers_paid: number
  total_vouchers_pending: number
  total_encumbrance_balance: number
  total_pending_retainage: number
  record_count: number
  unique_suppliers: number
  negative_paid_records: number
  large_paid_1m_records: number
  missing_po_date_records: number
}

export type SpendingByFiscalYearResponse =
  ApiListResponse<FiscalYearSpending>

export interface DepartmentSpending {
  fiscal_year: number
  organization_group: string
  department: string
  total_vouchers_paid: number
  total_vouchers_pending: number
  total_encumbrance_balance: number
  total_pending_retainage: number
  record_count: number
  unique_suppliers: number
  negative_paid_records: number
  large_paid_1m_records: number
  missing_po_date_records: number
}

export type SpendingByDepartmentResponse =
  PaginatedApiResponse<DepartmentSpending>

export interface SupplierSpending {
  supplier_name: string
  total_vouchers_paid: number
  total_vouchers_pending: number
  total_encumbrance_balance: number
  total_pending_retainage: number
  record_count: number
  unique_suppliers: number
  negative_paid_records: number
  large_paid_1m_records: number
  missing_po_date_records: number
}

export type TopSuppliersResponse =
  PaginatedApiResponse<SupplierSpending>