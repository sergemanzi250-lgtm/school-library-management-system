#!/bin/bash

# Database Migration Script

echo "🔄 Running Prisma migrations..."

# Run migrations
npx prisma migrate dev

echo "✅ Migrations completed!"
