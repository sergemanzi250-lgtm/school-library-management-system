import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const transactions = await prisma.borrowTransaction.findMany({
      where: { bookId: params.id },
      select: {
        id: true,
        userId: true,
        borrowedAt: true,
        dueDate: true,
        returnedAt: true,
        status: true,
      },
      orderBy: { borrowedAt: 'desc' },
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
