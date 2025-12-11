import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Seed users
  const adminPassword = await bcrypt.hash('password123', 10)
  const studentPassword = await bcrypt.hash('password123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@school.com' },
    update: {},
    create: {
      email: 'admin@school.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
      phone: '+1234567890',
    },
  })

  const librarian = await prisma.user.upsert({
    where: { email: 'librarian@school.com' },
    update: {},
    create: {
      email: 'librarian@school.com',
      name: 'Librarian User',
      password: adminPassword,
      role: 'LIBRARIAN',
      phone: '+1234567891',
    },
  })

  const principal = await prisma.user.upsert({
    where: { email: 'principal@school.com' },
    update: {},
    create: {
      email: 'principal@school.com',
      name: 'Principal User',
      password: adminPassword,
      role: 'PRINCIPAL',
      phone: '+1234567892',
    },
  })

  const student1 = await prisma.user.upsert({
    where: { email: 'student1@school.com' },
    update: {},
    create: {
      email: 'student1@school.com',
      name: 'Student One',
      password: studentPassword,
      role: 'STUDENT',
      phone: '+1234567893',
    },
  })

  const student2 = await prisma.user.upsert({
    where: { email: 'student2@school.com' },
    update: {},
    create: {
      email: 'student2@school.com',
      name: 'Student Two',
      password: studentPassword,
      role: 'STUDENT',
      phone: '+1234567894',
    },
  })

  console.log('✅ Users created:', {
    admin: admin.email,
    librarian: librarian.email,
    principal: principal.email,
    student1: student1.email,
    student2: student2.email,
  })

  // Seed books
  const booksData = [
    {
      isbn: '978-0-13-110362-7',
      title: 'The C Programming Language',
      author: 'Brian W. Kernighan, Dennis M. Ritchie',
      category: 'Programming',
      quantity: 5,
    },
    {
      isbn: '978-0-13-235088-4',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      category: 'Programming',
      quantity: 3,
    },
    {
      isbn: '978-0-201-63361-0',
      title: 'Design Patterns',
      author: 'Gang of Four',
      category: 'Software Design',
      quantity: 4,
    },
    {
      isbn: '978-0-07-019307-5',
      title: 'The Pragmatic Programmer',
      author: 'David Thomas, Andrew Hunt',
      category: 'Programming',
      quantity: 2,
    },
    {
      isbn: '978-0-596-00712-6',
      title: 'Learning SQL',
      author: 'Alan Beaulieu',
      category: 'Databases',
      quantity: 3,
    },
    {
      isbn: '978-1-491-95182-8',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      category: 'Fiction',
      quantity: 6,
    },
    {
      isbn: '978-0-7432-7356-5',
      title: '1984',
      author: 'George Orwell',
      category: 'Fiction',
      quantity: 5,
    },
    {
      isbn: '978-0-14-028329-7',
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      category: 'Fiction',
      quantity: 4,
    },
  ]

  for (const bookData of booksData) {
    await prisma.book.upsert({
      where: { isbn: bookData.isbn },
      update: {},
      create: {
        ...bookData,
        available: bookData.quantity,
      },
    })
  }

  console.log('✅ Books created:', booksData.length)

  // Seed a sample transaction
  const book = await prisma.book.findFirst()
  if (book && student1) {
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + 14)

    await prisma.borrowTransaction.create({
      data: {
        userId: student1.id,
        bookId: book.id,
        dueDate,
        status: 'BORROWED',
      },
    })

    // Update available count
    await prisma.book.update({
      where: { id: book.id },
      data: { available: book.available - 1 },
    })

    console.log('✅ Sample transaction created')
  }

  console.log('🎉 Database seed completed!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
