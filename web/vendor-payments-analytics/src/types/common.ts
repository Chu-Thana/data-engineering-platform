export interface ApiListResponse<T> {
  count: number
  data: T[]
}

export interface PaginatedApiResponse<T> {
  total_count: number
  count: number
  limit: number
  offset: number
  data: T[]
}