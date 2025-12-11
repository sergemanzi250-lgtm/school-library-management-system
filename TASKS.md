# 📋 Common Tasks & How To

## Starting the Application

### Option 1: PowerShell (Recommended)
```powershell
.\start.ps1
```

### Option 2: Command Prompt
```cmd
start.bat
```

### Option 3: Manual NPM
```bash
npm run dev
```

Server starts at: **http://localhost:3000**

---

## User Management

### Add a New User

1. Go to http://localhost:3000/dashboard/users
2. Click **+ Add User** button
3. Fill in form:
   - Name
   - Email (must be unique)
   - Password (min 8 characters)
   - Phone (optional)
   - Role (STUDENT, LIBRARIAN, PRINCIPAL, ADMIN)
4. Click **Add User**

### Delete a User

1. Go to http://localhost:3000/dashboard/users
2. Find the user in the table
3. Click **Delete** in the Actions column
4. Confirm deletion

### Change User Password

Currently, users must reset via their profile (not implemented yet).

---

## Book Management

### Add a New Book

1. Go to http://localhost:3000/dashboard/books
2. Click **+ Add Book** button
3. Fill in form:
   - ISBN (must be unique)
   - Title
   - Author
   - Category
   - Quantity
4. Click **Add Book**

The book is now in the system with the availability matching quantity.

### View Book Details

1. Go to http://localhost:3000/dashboard/books
2. Click **View** button next to a book
3. See:
   - Book information
   - Availability status
   - Borrowing history
   - Transaction details

### Edit Book (Currently View-Only)

Books can be viewed at: `/dashboard/books/[id]`

To enable editing, modify the file: `app/dashboard/books/[id]/page.tsx`

### Delete a Book

1. Go to http://localhost:3000/dashboard/books
2. Click **View** on the book
3. (Requires adding delete functionality to detail page)

---

## Borrowing System

### Borrow a Book (As Student)

1. Go to http://localhost:3000 (home page)
2. Sign in with student credentials
3. Browse the **Featured Books** section
4. Click **Borrow** on any available book
5. Confirm the action
6. Book is now borrowed with 14-day due date

### Check Borrowed Books

1. Sign in to your account
2. View dashboard or check home page
3. Books you borrowed show in transaction history

### Return a Book

Currently, book returns require admin action in transactions.

To enable student returns, add return functionality in the dashboard.

### View Borrowing History

1. Go to http://localhost:3000/dashboard/books/[id]
2. Scroll to "Borrowing History" section
3. See all past and current borrowers

---

## Dashboard

### View Statistics

1. Sign in as admin/librarian/principal
2. Go to http://localhost:3000/dashboard
3. See:
   - Total books
   - Available copies
   - Currently borrowed
   - Overdue books
   - Total users

### Refresh Statistics

1. Click **Refresh Stats** button on dashboard
2. Updates automatically

---

## Database Management

### View Database Contents

```bash
npx prisma studio
```

Opens browser UI to view/edit database at: http://localhost:5555

### Reset Database (⚠️ Deletes All Data)

```bash
# Option 1: Delete file and recreate
del dev.db
npx prisma migrate dev --name init
npx ts-node scripts/seed.ts

# Option 2: Prisma reset
npx prisma migrate reset
```

### Backup Database

```bash
# Copy the dev.db file to a safe location
copy dev.db dev.db.backup
```

### Restore Database

```bash
# Restore from backup
copy dev.db.backup dev.db
```

---

## Troubleshooting

### Server Won't Start

**Error**: `Port 3000 already in use`
```bash
npm run dev -- -p 3001
```

**Error**: `DATABASE_URL not found`
```bash
$env:DATABASE_URL="file:./dev.db"
npm run dev
```

### Database Issues

**Error**: `database.sqlite is locked`
```bash
# Restart the server
# Or delete the .db-shm and .db-wal files
del dev.db-shm dev.db-wal
```

**Error**: `Table does not exist`
```bash
npx prisma migrate dev --name init
```

### Login Issues

**Can't sign in**:
1. Check email is correct (case-sensitive)
2. Check password (password123 for demo)
3. User might be deleted - reseed database

### Page Errors

**404 Page Not Found**:
- Check URL spelling
- Make sure you're signed in for protected pages
- Rebuild: `npm run build`

---

## Configuration

### Change Port

```bash
npm run dev -- -p 3001
```

### Change Database

Edit `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Change from "sqlite"
  url      = env("DATABASE_URL")
}
```

Then:
```bash
$env:DATABASE_URL="postgresql://user:pass@localhost:5432/school_library"
npx prisma migrate dev --name migrate_to_postgres
```

### Add Email Notifications

1. Sign up at [Resend.com](https://resend.com)
2. Get API key
3. Update `.env.local`:
   ```env
   RESEND_API_KEY=re_your_key_here
   ```

### Add SMS Notifications

1. Sign up at [Twilio.com](https://twilio.com)
2. Get credentials
3. Update `.env.local`:
   ```env
   TWILIO_ACCOUNT_SID=your_sid
   TWILIO_AUTH_TOKEN=your_token
   TWILIO_PHONE_NUMBER=+1234567890
   ```

---

## Development

### Install New Package

```bash
npm install package-name
```

### Build for Production

```bash
npm run build
npm start
```

### Run Linter

```bash
npm run lint
```

### Debug with Console Logs

```typescript
console.log('debug info', variable)
```

Check terminal output or browser console (F12).

---

## Customization

### Change Colors

Edit `tailwind.config.ts`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
    },
  },
}
```

### Change Fonts

Edit `app/globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@400;600&display=swap');

body {
  font-family: 'YourFont', sans-serif;
}
```

### Add Logo

1. Place image in `public/` folder
2. Update `components/Header.tsx`:
   ```jsx
   <img src="/logo.png" alt="Logo" width={40} />
   ```

### Customize Email Notifications

Edit `lib/mailer.ts` to change email templates.

---

## Performance

### Check Build Size

```bash
npm run build
```

Outputs build size to terminal.

### Optimize Images

Use Next.js Image component:

```jsx
import Image from 'next/image'

<Image src="/book.jpg" alt="Book" width={300} height={400} />
```

---

## Security

### Generate New Auth Secret

```bash
openssl rand -base64 32
```

Update in `.env.local`:
```env
NEXTAUTH_SECRET=your-new-secret
```

### Change Demo Passwords

Edit `scripts/seed.ts` and reseed:
```bash
npx ts-node scripts/seed.ts
```

---

## Deployment

### Deploy to Vercel (Free)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import repository
4. Set environment variables
5. Deploy

### Deploy to Railway (Paid)

1. Push to GitHub
2. Go to [railway.app](https://railway.app)
3. Connect GitHub
4. Set environment variables
5. Deploy

---

## Getting Help

- 📚 Check `README.md` for full documentation
- ⚡ Check `QUICKSTART.md` for quick reference
- 🆘 Check `SETUP.md` for setup troubleshooting
- 💬 Check source code comments

---

**Last Updated**: December 11, 2025
**Status**: All systems operational ✅
