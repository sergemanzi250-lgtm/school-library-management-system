import { getServerSession } from 'next-auth'
import { authOptions } from './auth'

export async function getSession() {
  return getServerSession(authOptions)
}

export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    throw new Error('Unauthorized')
  }
  return session
}

export async function requireRole(allowedRoles: string[]) {
  const session = await requireAuth()
  const userRole = (session.user as any)?.role
  
  if (!allowedRoles.includes(userRole)) {
    throw new Error('Forbidden: Insufficient permissions')
  }
  
  return session
}
