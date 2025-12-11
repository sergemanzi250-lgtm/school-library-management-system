@echo off
REM School Library Management System - Startup Script

echo.
echo ==========================================
echo School Library Management System
echo ==========================================
echo.

REM Set environment variables
set DATABASE_URL=file:./dev.db
set NEXTAUTH_SECRET=test-secret-key-change-in-production
set NEXTAUTH_URL=http://localhost:3000

REM Install dependencies if needed
if not exist node_modules (
    echo Installing dependencies...
    call npm install
)

REM Generate Prisma client
echo Generating Prisma client...
call npx prisma generate

REM Run migrations
echo Setting up database...
call npx prisma migrate dev --name init || echo Database already initialized

REM Seed data if database is empty
echo Seeding database...
call npx ts-node scripts/seed.ts || echo Database already seeded

REM Start development server
echo.
echo Starting development server...
echo.
echo ==========================================
echo Server running at: http://localhost:3000
echo Dashboard: http://localhost:3000/dashboard
echo Sign In: http://localhost:3000/auth/sign-in
echo ==========================================
echo.
echo Demo Credentials:
echo   Admin: admin@school.com / password123
echo   Librarian: librarian@school.com / password123
echo   Student: student1@school.com / password123
echo.

call npm run dev
