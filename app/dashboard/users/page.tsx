'use client'

import { useEffect, useState } from 'react'
import { Card, Button, Input, Modal } from '@/components/ui'
import { Layout } from '@/components/Layout'

export const dynamic = 'force-dynamic'

interface User {
  id: string
  email: string
  name: string
  role: string
  phone: string | null
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    role: 'STUDENT',
    phone: '',
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users')
      const data = await res.json()
      setUsers(data)
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        alert('User added successfully!')
        setFormData({
          email: '',
          name: '',
          password: '',
          role: 'STUDENT',
          phone: '',
        })
        setShowModal(false)
        fetchUsers()
      } else {
        const error = await res.json()
        alert(`Error: ${error.message}`)
      }
    } catch (error) {
      console.error('Error adding user:', error)
      alert('Failed to add user')
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return

    try {
      const res = await fetch(`/api/users/${userId}`, { method: 'DELETE' })

      if (res.ok) {
        alert('User deleted successfully!')
        fetchUsers()
      } else {
        alert('Failed to delete user')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Manage Users</h1>
          <Button onClick={() => setShowModal(true)}>+ Add User</Button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : users.length === 0 ? (
          <Card>
            <p>No users found. Add your first user!</p>
          </Card>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Phone</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.phone || '-'}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded text-white text-xs font-semibold ${
                          user.role === 'ADMIN'
                            ? 'bg-red-600'
                            : user.role === 'PRINCIPAL'
                              ? 'bg-purple-600'
                              : user.role === 'LIBRARIAN'
                                ? 'bg-blue-600'
                                : 'bg-green-600'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Add New User"
        >
          <form onSubmit={handleAddUser} className="space-y-4">
            <Input
              label="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <Input
              label="Phone (optional)"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="STUDENT">Student</option>
                <option value="LIBRARIAN">Librarian</option>
                <option value="PRINCIPAL">Principal</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <Button type="submit" className="w-full">
              Add User
            </Button>
          </form>
        </Modal>
      </div>
    </Layout>
  )
}
