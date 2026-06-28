export const API_ENDPOINTS = {
  batch: {
    spendingByFiscalYear: '/api/v1/batch/spending-by-fiscal-year',
    spendingByDepartment: '/api/v1/batch/spending-by-department',
    topSuppliers: '/api/v1/batch/top-suppliers',
  },
  streaming: {
    events: '/api/v1/streaming/events',
    summary: '/api/v1/streaming/summary',
    departmentSummary: '/api/v1/streaming/department-summary',
    supplierSummary: '/api/v1/streaming/supplier-summary',
  },
} as const