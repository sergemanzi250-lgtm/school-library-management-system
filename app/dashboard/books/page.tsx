'use client'

import { useEffect, useState } from 'react'
import { Card, Button, Input, Modal } from '@/components/ui'
import { Layout } from '@/components/Layout'

export const dynamic = 'force-dynamic'

interface Book {
  id: string
  isbn: string
  title: string
  author: string
  category: string
  quantity: number
  available: number
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    isbn: '',
    title: '',
    author: '',
    category: '',
    quantity: 1,
  })

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

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        alert('Book added successfully!')
        setFormData({ isbn: '', title: '', author: '', category: '', quantity: 1 })
        setShowModal(false)
        fetchBooks()
      }
    } catch (error) {
      console.error('Error adding book:', error)
      alert('Failed to add book')
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Manage Books</h1>
          <Button onClick={() => setShowModal(true)}>+ Add Book</Button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : books.length === 0 ? (
          <Card>
            <p>No books found. Add your first book!</p>
          </Card>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Author</th>
                  <th className="px-4 py-2 text-left">ISBN</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-center">Quantity</th>
                  <th className="px-4 py-2 text-center">Available</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{book.title}</td>
                    <td className="px-4 py-2">{book.author}</td>
                    <td className="px-4 py-2">{book.isbn}</td>
                    <td className="px-4 py-2">{book.category}</td>
                    <td className="px-4 py-2 text-center">{book.quantity}</td>
                    <td className="px-4 py-2 text-center">
                      <span
                        className={`px-2 py-1 rounded text-white ${
                          book.available > 0 ? 'bg-green-600' : 'bg-red-600'
                        }`}
                      >
                        {book.available}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <a
                        href={`/dashboard/books/${book.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Add New Book"
        >
          <form onSubmit={handleAddBook} className="space-y-4">
            <Input
              label="ISBN"
              value={formData.isbn}
              onChange={(e) =>
                setFormData({ ...formData, isbn: e.target.value })
              }
              required
            />
            <Input
              label="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
            <Input
              label="Author"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              required
            />
            <Input
              label="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
            />
            <Input
              label="Quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: parseInt(e.target.value) })
              }
              required
            />
            <Button type="submit" className="w-full">
              Add Book
            </Button>
          </form>
        </Modal>
      </div>
    </Layout>
  )
}
