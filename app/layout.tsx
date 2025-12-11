import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import './globals.css'

export const metadata: Metadata = {
  title: 'School Library Management System',
  description: 'Manage books, borrowing, and reservations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
