#!/bin/bash
# Quick Start Script for School Library Management System

echo "🚀 School Library Management System - Quick Start"
echo "=================================================="
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Dependencies check
echo "📦 Dependencies are already installed (run 'npm install' if needed)"
echo ""

echo "📝 Next Steps:"
echo "1. Setup Database:"
echo "   - Local: Create PostgreSQL database 'school_library'"
echo "   - Cloud: Get connection string from Railway.app or Neon.tech"
echo ""
echo "2. Configure Environment:"
echo "   - Edit .env.local with your database URL"
echo "   - Generate NEXTAUTH_SECRET: openssl rand -base64 32"
echo ""
echo "3. Initialize Database:"
echo "   - npx prisma migrate dev --name init"
echo "   - npm run db:seed"
echo ""
echo "4. Start Server:"
echo "   - npm run dev"
echo "   - Visit http://localhost:3000"
echo ""
echo "5. Login with Demo Credentials:"
echo "   - Email: admin@school.com"
echo "   - Password: password123"
echo ""

echo "📖 Documentation:"
echo "   - README.md - Full documentation"
echo "   - SETUP.md - Detailed setup instructions"
echo "   - PROJECT_SUMMARY.md - Project overview"
echo ""

echo "🎯 Ready to start? Edit .env.local and follow step 3!"
echo ""
