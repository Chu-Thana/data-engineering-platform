import { useQuery } from '@tanstack/react-query'

import {
  getStreamingDepartmentSummary,
  getStreamingSummary,
} from './api'

export const streamingValidationQueryKeys = {
  all: ['streaming-validation'] as const,

  summary: () =>
    [...streamingValidationQueryKeys.all, 'summary'] as const,

  departments: () =>
    [...streamingValidationQueryKeys.all, 'departments'] as const,
}

export function useStreamingSummaryQuery() {
  return useQuery({
    queryKey: streamingValidationQueryKeys.summary(),
    queryFn: ({ signal }) => getStreamingSummary(signal),
  })
}

export function useStreamingDepartmentSummaryQuery() {
  return useQuery({
    queryKey: streamingValidationQueryKeys.departments(),
    queryFn: ({ signal }) =>
      getStreamingDepartmentSummary(signal),
  })
}