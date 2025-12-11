'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Providers } from '@/app/providers'
import { Card, Button } from '@/components/ui'
import { Layout } from '@/components/Layout'

export const dynamic = 'force-dynamic'

interface DashboardStats {
    totalBooks: number
    availableBooks: number
    totalUsers: number
    borrowedBooks: number
    overdueBooks: number
}

function DashboardContent() {
    const { data: session } = useSession()
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            const res = await fetch('/api/stats')
            const data = await res.json()
            setStats(data)
        } catch (error) {
            console.error('Failed to fetch stats:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Layout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
                    <p className="text-gray-600">
                        Welcome, {session?.user?.name} ({(session?.user as any)?.role})
                    </p>
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            <Card>
                                <h3 className="text-lg font-semibold text-gray-600">
                                    Total Books
                                </h3>
                                <p className="text-4xl font-bold text-blue-600 mt-2">
                                    {stats?.totalBooks || 0}
                                </p>
                            </Card>
                            <Card>
                                <h3 className="text-lg font-semibold text-gray-600">
                                    Available
                                </h3>
                                <p className="text-4xl font-bold text-green-600 mt-2">
                                    {stats?.availableBooks || 0}
                                </p>
                            </Card>
                            <Card>
                                <h3 className="text-lg font-semibold text-gray-600">
                                    Borrowed
                                </h3>
                                <p className="text-4xl font-bold text-orange-600 mt-2">
                                    {stats?.borrowedBooks || 0}
                                </p>
                            </Card>
                            <Card>
                                <h3 className="text-lg font-semibold text-gray-600">
                                    Overdue
                                </h3>
                                <p className="text-4xl font-bold text-red-600 mt-2">
                                    {stats?.overdueBooks || 0}
                                </p>
                            </Card>
                            <Card>
                                <h3 className="text-lg font-semibold text-gray-600">
                                    Total Users
                                </h3>
                                <p className="text-4xl font-bold text-purple-600 mt-2">
                                    {stats?.totalUsers || 0}
                                </p>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                                <div className="space-y-2">
                                    <a
                                        href="/dashboard/books"
                                        className="block p-3 bg-blue-50 hover:bg-blue-100 rounded transition-colors"
                                    >
                                        📚 Manage Books
                                    </a>
                                    <a
                                        href="/dashboard/users"
                                        className="block p-3 bg-green-50 hover:bg-green-100 rounded transition-colors"
                                    >
                                        👥 Manage Users
                                    </a>
                                    <a
                                        href="/"
                                        className="block p-3 bg-purple-50 hover:bg-purple-100 rounded transition-colors"
                                    >
                                        📖 View Catalog
                                    </a>
                                </div>
                            </Card>

                            <Card>
                                <h2 className="text-xl font-semibold mb-4">Information</h2>
                                <p className="text-gray-600 text-sm mb-4">
                                    Use the dashboard to manage your library&apos;s books, users, and
                                    transactions. Monitor borrowing trends and send notifications
                                    to users.
                                </p>
                                <Button onClick={fetchStats} size="sm">
                                    Refresh Stats
                                </Button>
                            </Card>
                        </div>
                    </>
                )}
            </div>
        </Layout>
    )
}

export default function Dashboard() {
    return (
        <Providers>
            <DashboardContent />
        </Providers>
    )
}
