# School Library Management System - Startup Script for PowerShell

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "School Library Management System" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Set environment variables
$env:DATABASE_URL = "file:./dev.db"
$env:NEXTAUTH_SECRET = "test-secret-key-change-in-production"
$env:NEXTAUTH_URL = "http://localhost:3000"

# Install dependencies if needed
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Generate Prisma client
Write-Host "Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate

# Run migrations
Write-Host "Setting up database..." -ForegroundColor Yellow
try {
    npx prisma migrate dev --name init
} catch {
    Write-Host "Database already initialized" -ForegroundColor Gray
}

# Seed data
Write-Host "Seeding database..." -ForegroundColor Yellow
try {
    npx ts-node scripts/seed.ts
} catch {
    Write-Host "Database already seeded" -ForegroundColor Gray
}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "Starting development server..." -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Server running at: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Dashboard: http://localhost:3000/dashboard" -ForegroundColor Cyan
Write-Host "Sign In: http://localhost:3000/auth/sign-in" -ForegroundColor Cyan
Write-Host ""
Write-Host "Demo Credentials:" -ForegroundColor Yellow
Write-Host "  Admin: admin@school.com / password123"
Write-Host "  Librarian: librarian@school.com / password123"
Write-Host "  Student: student1@school.com / password123"
Write-Host ""

npm run dev
