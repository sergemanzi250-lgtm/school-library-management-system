'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { Card } from '@/components/ui'
import { Layout } from '@/components/Layout'

export const dynamic = 'force-dynamic'

interface Book {
    id: string
    isbn: string
    title: string
    author: string
    description: string
    category: string
    quantity: number
    available: number
    publishedAt: string
}

interface Transaction {
    id: string
    userId: string
    borrowedAt: string
    dueDate: string
    returnedAt: string | null
    status: string
}

export default function BookDetailsPage() {
    const params = useParams()
    const bookId = params.id as string
    const [book, setBook] = useState<Book | null>(null)
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(true)

    const fetchBookDetails = useCallback(async () => {
        try {
            const [bookRes, transRes] = await Promise.all([
                fetch(`/api/books/${bookId}`),
                fetch(`/api/books/${bookId}/transactions`),
            ])

            if (bookRes.ok) {
                const bookData = await bookRes.json()
                setBook(bookData)
            }

            if (transRes.ok) {
                const transData = await transRes.json()
                setTransactions(transData)
            }
        } catch (error) {
            console.error('Failed to fetch book details:', error)
        } finally {
            setLoading(false)
        }
    }, [bookId])

    useEffect(() => {
        fetchBookDetails()
    }, [fetchBookDetails])

    if (loading) return <Layout><p>Loading...</p></Layout>

    if (!book)
        return (
            <Layout>
                <Card>
                    <p>Book not found</p>
                </Card>
            </Layout>
        )

    return (
        <Layout>
            <div className="space-y-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
                        <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
                        <div className="flex gap-4">
                            <div>
                                <span className="text-gray-600">Category: </span>
                                <span className="font-semibold">{book.category}</span>
                            </div>
                            <div>
                                <span className="text-gray-600">ISBN: </span>
                                <span className="font-semibold">{book.isbn}</span>
                            </div>
                        </div>
                    </div>
                    <Card className="text-center min-w-[150px]">
                        <p className="text-3xl font-bold text-green-600">{book.available}</p>
                        <p className="text-gray-600">Available</p>
                        <p className="text-sm text-gray-500 mt-2">of {book.quantity} total</p>
                    </Card>
                </div>

                {book.description && (
                    <Card>
                        <h2 className="text-xl font-semibold mb-3">Description</h2>
                        <p className="text-gray-700 leading-relaxed">{book.description}</p>
                    </Card>
                )}

                <Card>
                    <h2 className="text-xl font-semibold mb-4">Borrowing History</h2>
                    {transactions.length === 0 ? (
                        <p className="text-gray-600">No borrowing records yet</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 text-left">User ID</th>
                                        <th className="px-4 py-2 text-left">Borrowed</th>
                                        <th className="px-4 py-2 text-left">Due Date</th>
                                        <th className="px-4 py-2 text-left">Returned</th>
                                        <th className="px-4 py-2 text-left">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((trans) => (
                                        <tr key={trans.id} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-2">{trans.userId}</td>
                                            <td className="px-4 py-2">
                                                {new Date(trans.borrowedAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-2">
                                                {new Date(trans.dueDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-2">
                                                {trans.returnedAt
                                                    ? new Date(trans.returnedAt).toLocaleDateString()
                                                    : '-'}
                                            </td>
                                            <td className="px-4 py-2">
                                                <span
                                                    className={`px-2 py-1 rounded text-white text-xs font-semibold ${trans.status === 'RETURNED'
                                                            ? 'bg-green-600'
                                                            : trans.status === 'OVERDUE'
                                                                ? 'bg-red-600'
                                                                : 'bg-blue-600'
                                                        }`}
                                                >
                                                    {trans.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>

                <a
                    href="/dashboard/books"
                    className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded transition-colors"
                >
                    ← Back to Books
                </a>
            </div>
        </Layout>
    )
}
