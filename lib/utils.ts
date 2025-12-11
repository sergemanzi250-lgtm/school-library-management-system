// Date utilities
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function getDaysUntilDue(dueDate: Date | string): number {
  const due = typeof dueDate === 'string' ? new Date(dueDate) : dueDate
  const today = new Date()
  const diffTime = due.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function isOverdue(dueDate: Date | string): boolean {
  return getDaysUntilDue(dueDate) < 0
}

// String utilities
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.substring(0, length - 3) + '...'
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

// Color utilities for status badges
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    BORROWED: 'bg-blue-600',
    RETURNED: 'bg-green-600',
    OVERDUE: 'bg-red-600',
    ACTIVE: 'bg-blue-600',
    CANCELLED: 'bg-gray-600',
    FULFILLED: 'bg-green-600',
    ADMIN: 'bg-red-600',
    PRINCIPAL: 'bg-purple-600',
    LIBRARIAN: 'bg-blue-600',
    STUDENT: 'bg-green-600',
  }
  return colors[status] || 'bg-gray-600'
}

// Generate ISBN-like ID (for demo purposes)
export function generateISBN(): string {
  return '978-' + Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('')
}
