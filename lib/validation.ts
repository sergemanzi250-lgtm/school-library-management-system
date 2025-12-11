// API Error Response Helper
export class ApiError extends Error {
    constructor(
        public statusCode: number,
        message: string
    ) {
        super(message)
        this.name = 'ApiError'
    }
}

export function handleApiError(error: unknown) {
    if (error instanceof ApiError) {
        return {
            statusCode: error.statusCode,
            message: error.message,
        }
    }

    console.error('Unexpected error:', error)
    return {
        statusCode: 500,
        message: 'Internal server error',
    }
}

// Validation helpers
export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

export function validateISBN(isbn: string): boolean {
    // Remove hyphens and spaces
    const clean = isbn.replace(/[-\s]/g, '')

    // Check length (10 or 13)
    if (clean.length !== 10 && clean.length !== 13) {
        return false
    }

    // Simple validation - could be enhanced with checksum validation
    return /^\d{10}(\d{3})?$/.test(clean)
}

export function validatePassword(password: string): boolean {
    // Minimum 8 characters, at least one letter and one number
    return password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password)
}
