'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          📚 School Library
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="hover:text-blue-200">
            Home
          </Link>
          {session?.user && (
            <>
              {['ADMIN', 'LIBRARIAN', 'PRINCIPAL'].includes(
                (session.user as any)?.role
              ) && (
                <Link href="/dashboard" className="hover:text-blue-200">
                  Dashboard
                </Link>
              )}
              <span className="text-sm">
                {session.user.name} ({(session.user as any)?.role})
              </span>
              <button
                onClick={() => signOut()}
                className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded"
              >
                Sign Out
              </button>
            </>
          )}
          {!session && (
            <Link
              href="/auth/sign-in"
              className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
