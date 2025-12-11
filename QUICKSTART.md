# Quick Reference Guide

## 🚀 Getting Started

### Option 1: Windows Batch (start.bat)
```bash
start.bat
```

### Option 2: PowerShell (start.ps1)
```powershell
.\start.ps1
```

### Option 3: Manual Commands
```bash
# Set environment variables
set DATABASE_URL=file:./dev.db
set NEXTAUTH_SECRET=test-secret-key-change-in-production
set NEXTAUTH_URL=http://localhost:3000

# Install dependencies
npm install

# Run migrations
npx prisma migrate dev --name init

# Seed database
npx ts-node scripts/seed.ts

# Start development server
npm run dev
```

## 📍 Access the Application

- **Home Page**: http://localhost:3000
- **Dashboard**: http://localhost:3000/dashboard
- **Sign In**: http://localhost:3000/auth/sign-in

## 👤 Demo Credentials

| Role      | Email                 | Password    |
|-----------|----------------------|------------|
| Admin     | admin@school.com     | password123|
| Librarian | librarian@school.com | password123|
| Principal | principal@school.com | password123|
| Student   | student1@school.com  | password123|

## 🛠️ Common Commands

### Database Management
```bash
# View database in browser
npx prisma studio

# Create new migration
npx prisma migrate dev --name migration_name

# Reset database (⚠️ loses data)
npx prisma migrate reset

# Seed database again
npx ts-node scripts/seed.ts
```

### Development
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📁 Important Files

| File | Purpose |
|------|---------|
| `.env.local` | Environment variables |
| `prisma/schema.prisma` | Database schema |
| `app/` | Next.js pages and API |
| `components/` | React components |
| `lib/` | Utility functions |

## 🔑 Key Features

- ✅ SQLite database (no setup needed)
- ✅ User authentication with NextAuth
- ✅ Role-based access control
- ✅ Book management
- ✅ User management
- ✅ Borrow/return transactions
- ✅ Email notifications (configure Resend)

## ⚠️ Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Database locked
Delete `dev.db` and `dev.db-shm` files, then restart

### Module not found
```bash
npm install
npx prisma generate
```

## 📝 Next Steps

1. **Customize branding** in `tailwind.config.ts` and components
2. **Add email notifications** by setting `RESEND_API_KEY`
3. **Add SMS notifications** by setting Twilio credentials
4. **Deploy to Vercel** or your preferred platform
5. **Switch to PostgreSQL** for production by updating `prisma/schema.prisma`

## 🔐 Security Notes

- ⚠️ Change `NEXTAUTH_SECRET` in production
- ⚠️ Switch to PostgreSQL for production
- ⚠️ Configure real email service (Resend)
- ⚠️ Use HTTPS in production
- ⚠️ Set secure session cookies

## 📚 Documentation

- Next.js: https://nextjs.org/docs
- Prisma: https://www.prisma.io/docs
- NextAuth: https://next-auth.js.org
- Tailwind: https://tailwindcss.com/docs

---

For more details, see `SETUP.md` and `README.md`
