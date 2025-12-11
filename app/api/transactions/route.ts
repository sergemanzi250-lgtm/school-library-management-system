import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { sendBorrowConfirmation } from '@/lib/notifier'

export async function GET() {
    try {
        const transactions = await prisma.borrowTransaction.findMany({
            select: {
                id: true,
                userId: true,
                bookId: true,
                borrowedAt: true,
                dueDate: true,
                returnedAt: true,
                status: true,
            },
        })
        return NextResponse.json(transactions)
    } catch (error) {
        console.error('Error fetching transactions:', error)
        return NextResponse.json(
            { error: 'Failed to fetch transactions' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { userId, bookId, dueDate } = body

        // Get user and book details
        const [user, book] = await Promise.all([
            prisma.user.findUnique({ where: { id: userId } }),
            prisma.book.findUnique({ where: { id: bookId } }),
        ])

        if (!user || !book) {
            return NextResponse.json(
                { error: 'User or Book not found' },
                { status: 404 }
            )
        }

        if (book.available <= 0) {
            return NextResponse.json(
                { error: 'Book not available' },
                { status: 400 }
            )
        }

        // Create transaction and update book availability
        const [transaction] = await Promise.all([
            prisma.borrowTransaction.create({
                data: {
                    userId,
                    bookId,
                    dueDate: new Date(dueDate),
                    status: 'BORROWED',
                },
            }),
            prisma.book.update({
                where: { id: bookId },
                data: { available: book.available - 1 },
            }),
        ])

        // Send notification
        await sendBorrowConfirmation(
            user.email,
            user.phone,
            user.name,
            book.title,
            new Date(dueDate).toLocaleDateString()
        )

        return NextResponse.json(transaction, { status: 201 })
    } catch (error) {
        console.error('Error creating transaction:', error)
        return NextResponse.json(
            { error: 'Failed to create transaction' },
            { status: 500 }
        )
    }
}
