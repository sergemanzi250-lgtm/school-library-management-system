# 📚 School Library Management System

A comprehensive full-stack web application for managing a school library's book inventory, borrowing transactions, and user roles.

## ✨ Features

- **📖 Book Inventory Management** - Add, edit, and manage book catalog
- **👥 User Management** - Manage students, librarians, admins, and principals
- **📤 Book Borrowing** - Students can borrow books with automatic due dates
- **📬 Notifications** - Email and SMS notifications for borrowing and overdue alerts
- **🔐 Role-Based Access Control** - Different dashboards for different user roles
- **📊 Dashboard Analytics** - View library statistics and metrics
- **🔍 Book Reservations** - Reserve books when unavailable
- **⚠️ Overdue Tracking** - Automatic tracking and alerts for overdue books

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Notifications**: Resend (Email), Twilio (SMS)
- **Password Hashing**: bcryptjs

## 📦 Prerequisites

- Node.js 18+ and npm
- SQLite (included with Node.js, or built-in)
- *Optional: PostgreSQL for production deployment*
- *Optional: Resend API key for email notifications*
- *Optional: Twilio credentials for SMS notifications*

## 🚀 Quick Start

### 1. Clone and Install

```bash
npm install
```

### 2. Set Up Database (Automatic)

The project uses SQLite by default - no database installation needed! The database will be created automatically.

### 3. Run Migrations and Seed Data

```bash
# On Windows (PowerShell)
$env:DATABASE_URL="file:./dev.db"
$env:NEXTAUTH_SECRET="test-secret-key"
npx prisma migrate dev --name init
npx ts-node scripts/seed.ts

# Or use the startup script (Windows)
.\start.ps1
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Demo Credentials

After seeding, use these credentials to test:

| Role      | Email                 | Password      |
|-----------|----------------------|--------------|
| Admin     | admin@school.com     | password123  |
| Librarian | librarian@school.com | password123  |
| Principal | principal@school.com | password123  |
| Student   | student1@school.com  | password123  |

## 📁 Project Structure

```
school-library/
├── app/
│   ├── layout.tsx                 # Root layout with SessionProvider
│   ├── page.tsx                   # Home page with book catalog
│   ├── globals.css                # Global styles
│   ├── auth/
│   │   └── sign-in/page.tsx       # Login page
│   ├── dashboard/
│   │   ├── page.tsx               # Dashboard home
│   │   ├── books/
│   │   │   ├── page.tsx           # Book management
│   │   │   └── [id]/page.tsx      # Book details & history
│   │   └── users/
│   │       └── page.tsx           # User management
│   └── api/
│       ├── books/
│       │   ├── route.ts           # Get/Create books
│       │   └── [id]/
│       │       ├── route.ts       # Get/Update/Delete book
│       │       └── transactions/  # Book transaction history
│       ├── users/
│       │   ├── route.ts           # Get/Create users
│       │   └── [id]/route.ts      # Delete user
│       ├── transactions/route.ts  # Borrow/Return books
│       └── stats/route.ts         # Dashboard statistics
├── components/
│   ├── Header.tsx                 # Navigation header
│   ├── BookCard.tsx               # Book display component
│   ├── Layout.tsx                 # Main layout wrapper
│   └── ui/
│       ├── Button.tsx             # Reusable button
│       ├── Input.tsx              # Reusable input field
│       ├── Modal.tsx              # Modal dialog
│       └── Card.tsx               # Card component
├── lib/
│   ├── prisma.ts                  # Prisma client
│   ├── auth.ts                    # NextAuth configuration
│   ├── mailer.ts                  # Email helpers
│   └── notifier.ts                # Notification service
├── prisma/
│   ├── schema.prisma              # Database schema
│   └── migrations/                # Database migrations
├── scripts/
│   ├── seed.ts                    # Database seeding
│   └── migrate.sh                 # Migration script
├── middleware.ts                  # Route protection
├── .env.example                   # Environment template
├── tailwind.config.ts             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
├── next.config.js                 # Next.js configuration
└── package.json                   # Dependencies
```

## 🔐 User Roles

| Role      | Permissions                          |
|-----------|--------------------------------------|
| Admin     | Full system access, user management |
| Principal | View statistics, manage librarians  |
| Librarian | Manage books, view transactions     |
| Student   | Borrow books, view borrowed items  |

## 🔑 API Endpoints

### Books
- `GET /api/books` - List all books
- `POST /api/books` - Create new book
- `GET /api/books/[id]` - Get book details
- `PUT /api/books/[id]` - Update book
- `DELETE /api/books/[id]` - Delete book
- `GET /api/books/[id]/transactions` - Get borrowing history

### Users
- `GET /api/users` - List all users
- `POST /api/users` - Create new user
- `DELETE /api/users/[id]` - Delete user

### Transactions
- `GET /api/transactions` - List all transactions
- `POST /api/transactions` - Create borrow transaction
- `PUT /api/transactions/[id]` - Update transaction (return book)

### Stats
- `GET /api/stats` - Dashboard statistics

## 📧 Email Notifications

The system sends emails for:
- Book borrowing confirmation
- Reminder before due date
- Overdue alerts
- Reservation notifications

Configure Resend API key in `.env.local`:
```
RESEND_API_KEY=re_your_api_key
```

## 📱 SMS Notifications (Optional)

Configure Twilio credentials for SMS alerts:
```
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
```

## 🗄️ Database Schema

### Users
- `id`: Unique identifier
- `email`: User email
- `name`: Full name
- `password`: Hashed password
- `role`: ADMIN, PRINCIPAL, LIBRARIAN, STUDENT
- `phone`: Contact number (optional)

### Books
- `id`: Unique identifier
- `isbn`: International Standard Book Number
- `title`: Book title
- `author`: Author name
- `category`: Book category
- `quantity`: Total copies
- `available`: Currently available copies
- `description`: Book description (optional)

### BorrowTransactions
- `id`: Unique identifier
- `userId`: Reference to user
- `bookId`: Reference to book
- `borrowedAt`: Borrowing date
- `dueDate`: Return due date
- `returnedAt`: Actual return date
- `status`: BORROWED, RETURNED, OVERDUE

## 🧪 Testing

Run tests:
```bash
npm test
```

## 🚀 Deployment

### Vercel Deployment

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Manual Deployment

```bash
npm run build
npm start
```

## 🐛 Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Check DATABASE_URL in `.env.local`
- Run migrations: `npx prisma migrate dev`

### Authentication Issues
- Generate new NEXTAUTH_SECRET: `openssl rand -base64 32`
- Clear browser cookies
- Verify NextAuth configuration

### Email Not Sending
- Check Resend API key
- Verify email configuration in `.env.local`
- Check email in spam folder

## 📝 Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/school_library"

# NextAuth
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# Email (Resend)
RESEND_API_KEY="re_your_api_key"

# SMS (Twilio)
TWILIO_ACCOUNT_SID="your_account_sid"
TWILIO_AUTH_TOKEN="your_auth_token"
TWILIO_PHONE_NUMBER="+1234567890"
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues or questions, please open an issue on GitHub or contact the development team.

---

**Made with ❤️ for school library management**
