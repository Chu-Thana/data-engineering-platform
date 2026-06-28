import type { StreamingDepartmentSummary } from '../../types/streaming'

export function getTopStreamingDepartments(
  departments: StreamingDepartmentSummary[],
  limit = 10,
): StreamingDepartmentSummary[] {
  return [...departments]
    .sort(
      (first, second) =>
        second.total_payment_amount -
        first.total_payment_amount,
    )
    .slice(0, limit)
}