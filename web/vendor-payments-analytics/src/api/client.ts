const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

if (!API_BASE_URL) {
  throw new Error('VITE_API_BASE_URL is not configured')
}

export class ApiError extends Error {
  readonly status: number
  readonly statusText: string

  constructor(status: number, statusText: string) {
    super(`API request failed: ${status} ${statusText}`)
    this.name = 'ApiError'
    this.status = status
    this.statusText = statusText
  }
}

export async function apiGet<T>(
  endpoint: string,
  signal?: AbortSignal,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    signal,
  })

  if (!response.ok) {
    throw new ApiError(response.status, response.statusText)
  }

  return response.json() as Promise<T>
}