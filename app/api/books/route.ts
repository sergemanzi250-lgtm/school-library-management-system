import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      select: {
        id: true,
        isbn: true,
        title: true,
        author: true,
        category: true,
        quantity: true,
        available: true,
      },
    })
    return NextResponse.json(books)
  } catch (error) {
    console.error('Error fetching books:', error)
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { isbn, title, author, category, quantity } = body

    // Check if book already exists
    const existing = await prisma.book.findUnique({
      where: { isbn },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Book with this ISBN already exists' },
        { status: 400 }
      )
    }

    const book = await prisma.book.create({
      data: {
        isbn,
        title,
        author,
        category,
        quantity,
        available: quantity,
      },
    })

    return NextResponse.json(book, { status: 201 })
  } catch (error) {
    console.error('Error creating book:', error)
    return NextResponse.json(
      { error: 'Failed to create book' },
      { status: 500 }
    )
  }
}
