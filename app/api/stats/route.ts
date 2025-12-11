import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const [totalBooks, availableBooks, totalUsers, borrowedBooks, overdueBooks] =
      await Promise.all([
        prisma.book.count(),
        prisma.book.aggregate({
          _sum: { available: true },
        }),
        prisma.user.count(),
        prisma.borrowTransaction.count({
          where: { status: 'BORROWED' },
        }),
        prisma.borrowTransaction.count({
          where: { status: 'OVERDUE' },
        }),
      ])

    return NextResponse.json({
      totalBooks,
      availableBooks: availableBooks._sum.available || 0,
      totalUsers,
      borrowedBooks,
      overdueBooks,
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
