'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Providers } from './providers'
import { Layout } from '@/components/Layout'
import { BookCard } from '@/components/BookCard'
import { Card } from '@/components/ui'

interface Book {
  id: string
  title: string
  author: string
  category: string
  available: number
  quantity: number
}

function PageContent() {
  const { data: session } = useSession()
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      const res = await fetch('/api/books')
      const data = await res.json()
      setBooks(data)
    } catch (error) {
      console.error('Failed to fetch books:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBorrow = async (bookId: string) => {
    if (!session) {
      alert('Please sign in first')
      return
    }

    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookId,
          userId: (session.user as any)?.id,
          dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        }),
      })

      if (res.ok) {
        alert('Book borrowed successfully!')
        fetchBooks()
      } else {
        alert('Failed to borrow book')
      }
    } catch (error) {
      console.error('Error borrowing book:', error)
    }
  }

  return (
    <Layout>
      <div className="py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to School Library
        </h1>
        {session && (
          <p className="text-lg text-gray-600 mb-8">
            Hello, {session.user?.name}! Explore our collection of books.
          </p>
        )}

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Featured Books</h2>
          {loading ? (
            <p>Loading books...</p>
          ) : books.length === 0 ? (
            <Card>
              <p className="text-gray-600">
                No books available. Please check back later.
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onBorrow={session ? handleBorrow : undefined}
                />
              ))}
            </div>
          )}
        </div>

        {!session && (
          <Card className="bg-blue-50 border-2 border-blue-200">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              Sign In Required
            </h3>
            <p className="text-blue-800 mb-4">
              To borrow books, please sign in to your account.
            </p>
            <a
              href="/auth/sign-in"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors"
            >
              Sign In Now
            </a>
          </Card>
        )}
      </div>
    </Layout>
  )
}

export default function Home() {
  return (
    <Providers>
      <PageContent />
    </Providers>
  )
}
