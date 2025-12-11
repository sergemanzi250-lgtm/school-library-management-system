export const metadata = {
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
            <body>{children}</body>
        </html>
    )
}
