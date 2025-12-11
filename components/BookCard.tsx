'use client'

import { Card } from './ui'

interface Book {
    id: string
    title: string
    author: string
    category: string
    available: number
}

interface BookCardProps {
    book: Book
    onBorrow?: (bookId: string) => void
    onManage?: (bookId: string) => void
}

export function BookCard({ book, onBorrow, onManage }: BookCardProps) {
    return (
        <Card className="flex flex-col h-full">
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {book.title}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                    <strong>Author:</strong> {book.author}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                    <strong>Category:</strong> {book.category}
                </p>
                <p
                    className={`text-sm font-medium ${book.available > 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                >
                    Available: {book.available}
                </p>
            </div>
            <div className="flex gap-2 mt-4">
                {onBorrow && (
                    <button
                        onClick={() => onBorrow(book.id)}
                        disabled={book.available === 0}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-2 rounded transition-colors"
                    >
                        Borrow
                    </button>
                )}
                {onManage && (
                    <button
                        onClick={() => onManage(book.id)}
                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded transition-colors"
                    >
                        Manage
                    </button>
                )}
            </div>
        </Card>
    )
}
