# Setup Guide for School Library Management System

## Prerequisites
- Node.js 18+ installed
- PostgreSQL database running
- Code editor (VS Code recommended)

## Step 1: Install Dependencies
Dependencies are already installed. If needed, run:
```bash
npm install
```

## Step 2: Configure Database

### Option A: Using Local PostgreSQL

1. Create a database:
```sql
CREATE DATABASE school_library;
```

2. Update `.env.local`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/school_library"
```

### Option B: Using PostgreSQL Online Service
- Sign up at https://railway.app or https://neon.tech
- Get your connection string
- Update `DATABASE_URL` in `.env.local`

## Step 3: Set Up Authentication Secret

Generate a random secret:
```bash
openssl rand -base64 32
```

Copy the output and update `NEXTAUTH_SECRET` in `.env.local`

## Step 4: Initialize Database

```bash
# Run migrations
npx prisma migrate dev --name init

# Seed sample data
npm run db:seed
```

## Step 5: Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## Demo Credentials

| Role      | Email                 | Password    |
|-----------|----------------------|------------|
| Admin     | admin@school.com     | password123|
| Librarian | librarian@school.com | password123|
| Principal | principal@school.com | password123|
| Student   | student1@school.com  | password123|

## Optional: Email Notifications

1. Sign up at [Resend.com](https://resend.com)
2. Get your API key
3. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_your_key_here
   ```

## Optional: SMS Notifications

1. Sign up at [Twilio.com](https://www.twilio.com)
2. Get your credentials and phone number
3. Add to `.env.local`:
   ```
   TWILIO_ACCOUNT_SID=your_sid
   TWILIO_AUTH_TOKEN=your_token
   TWILIO_PHONE_NUMBER=+1234567890
   ```

## Database Management

### View database contents
```bash
npx prisma studio
```

### Create migration
```bash
npx prisma migrate dev --name your_migration_name
```

### Reset database (⚠️ loses data)
```bash
npx prisma migrate reset
```

## Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Database connection error
- Ensure PostgreSQL is running
- Check `DATABASE_URL` in `.env.local`
- Verify password is correct

### Module not found errors
```bash
npm install
npm run build
```

### Prisma errors
```bash
npx prisma generate
npm run db:push
```

## Project Structure Quick Reference

- **app/** - Next.js pages and API routes
- **components/** - React components
- **lib/** - Utility functions and configuration
- **prisma/** - Database schema and migrations
- **scripts/** - Helper scripts for seeding, migration
- **public/** - Static files

## Next Steps

1. Customize branding and colors in `tailwind.config.ts`
2. Add more book categories
3. Set up email/SMS notifications
4. Deploy to Vercel or Railway

## Support

Check the main README.md for more information and API documentation.
