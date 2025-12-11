import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    _request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const book = await prisma.book.findUnique({
            where: { id: params.id },
        })

        if (!book) {
            return NextResponse.json(
                { error: 'Book not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(book)
    } catch (error) {
        console.error('Error fetching book:', error)
        return NextResponse.json(
            { error: 'Failed to fetch book' },
            { status: 500 }
        )
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json()
        const book = await prisma.book.update({
            where: { id: params.id },
            data: body,
        })
        return NextResponse.json(book)
    } catch (error) {
        console.error('Error updating book:', error)
        return NextResponse.json(
            { error: 'Failed to update book' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    _request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.book.delete({
            where: { id: params.id },
        })
        return NextResponse.json({ message: 'Book deleted' })
    } catch (error) {
        console.error('Error deleting book:', error)
        return NextResponse.json(
            { error: 'Failed to delete book' },
            { status: 500 }
        )
    }
}
