export function formatCompactCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('en-US', {
    signDisplay: 'always',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value) + '%'
}