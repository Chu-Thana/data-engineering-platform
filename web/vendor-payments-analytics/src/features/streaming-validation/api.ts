import { apiGet } from '../../api/client'
import { API_ENDPOINTS } from '../../api/endpoints'
import type {
  StreamingDepartmentSummaryResponse,
  StreamingSummaryResponse,
} from '../../types/streaming'

export function getStreamingSummary(
  signal?: AbortSignal,
): Promise<StreamingSummaryResponse> {
  return apiGet<StreamingSummaryResponse>(
    API_ENDPOINTS.streaming.summary,
    signal,
  )
}

export function getStreamingDepartmentSummary(
  signal?: AbortSignal,
): Promise<StreamingDepartmentSummaryResponse> {
  const searchParams = new URLSearchParams({
    limit: '100',
    offset: '0',
  })

  return apiGet<StreamingDepartmentSummaryResponse>(
    `${API_ENDPOINTS.streaming.departmentSummary}?${searchParams.toString()}`,
    signal,
  )
}