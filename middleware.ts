import { withAuth } from 'next-auth/middleware'

export const config = {
    matcher: ['/dashboard/:path*', '/api/protected/:path*'],
}

export default withAuth(
    function middleware(req) {
        // Check role-based access
        const token = req.nextauth.token
        const pathname = req.nextUrl.pathname

        // Admin and Librarian access dashboard
        if (
            pathname.startsWith('/dashboard') &&
            token?.role &&
            !['ADMIN', 'LIBRARIAN', 'PRINCIPAL'].includes(token.role as string)
        ) {
            return new Response('Unauthorized', { status: 401 })
        }

        return null
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
)
