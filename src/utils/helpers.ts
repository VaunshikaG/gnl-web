export const formatDate = (date: string | Date): string => {
  const d = new Date(date)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[d.getMonth()]} ${d.getDate()}`
}

export const formatDateTime = (date: string | Date): string => {
  const d = new Date(date)
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  return `${formatDate(date)} at ${hours}:${minutes}`
}

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':')
  const h = parseInt(hours)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const displayHours = h % 12 || 12
  return `${displayHours}:${minutes} ${ampm}`
}

export const formatDistance = (km: number): string => {
  if (km < 1) {
    return `${Math.round(km * 1000)}m away`
  }
  return `${km.toFixed(1)}km away`
}

export const truncateText = (text: string, length: number = 100): string => {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

export const getCategoryIcon = (category: string) => {
  const categoryIcons: Record<string, string> = {
    'DJ Night': '🎧',
    'Live Band': '🎸',
    'Music Festival': '🎵',
    'Comedy Night': '😂',
    'Dance': '💃',
    'Other': '🎉',
  }
  return categoryIcons[category] || '🎉'
}

export const getPriceRange = (price?: number): string => {
  if (!price) return 'Free'
  if (price < 500) return '$ (Budget)'
  if (price < 1500) return '$$ (Moderate)'
  if (price < 3000) return '$$$ (Premium)'
  return '$$$$ (Luxury)'
}

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

export const cn = (...classes: (string | boolean | undefined)[]): string => {
  return classes.filter(Boolean).join(' ')
}
