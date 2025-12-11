# Environment Variables Setup Guide

## Required Environment Variables

### 1. DATABASE_URL
```
DATABASE_URL="postgresql://username:password@hostname:5432/database_name"
```
**Instructions:**
- **Local Development:** Use your local PostgreSQL connection string
- **Production (Vercel):** Use the connection string from your PostgreSQL provider (e.g., Railway, Supabase, PlanetScale)
- **Format:** `postgresql://user:password@host:port/database`

### 2. NEXTAUTH_URL
```
NEXTAUTH_URL="https://school-library-management-system-omega.vercel.app"
```
**Instructions:**
- **Development:** `http://localhost:3000`
- **Production:** Your Vercel deployment URL (already provided)

### 3. NEXTAUTH_SECRET
```
NEXTAUTH_SECRET="your-256-bit-secret-key-generate-with-openssl-or-similar"
```
**Instructions:**
Generate a secure 32-character secret using:
```bash
openssl rand -base64 32
```
Or use any random string generator.

### 4. EMAIL_API_KEY
```
EMAIL_API_KEY="your-email-service-api-key"
```
**Instructions:**
- **SendGrid:** Get from SendGrid dashboard → API Keys
- **Resend:** Get from Resend dashboard → API Keys
- **Other providers:** Use respective API key format

### 5. TWILIO_SID
```
TWILIO_SID="your_twilio_account_sid"
```
**Instructions:**
- Get from Twilio Console → Account → Account SID

### 6. TWILIO_TOKEN
```
TWILIO_TOKEN="your_twilio_auth_token"
```
**Instructions:**
- Get from Twilio Console → Account → Auth Token

### 7. TWILIO_FROM
```
TWILIO_FROM="+1234567890"
```
**Instructions:**
- Your Twilio phone number in E.164 format (e.g., +1234567890)

## Setup Steps

1. **Copy .env.example to .env.local:**
   ```bash
   cp .env.example .env.local
   ```

2. **Fill in your actual values in .env.local**

3. **For production deployment:**
   - Add these variables in Vercel dashboard → Settings → Environment Variables
   - Use the production values for each environment

## Security Notes

- Never commit .env.local to version control
- Use strong, unique secrets for NEXTAUTH_SECRET
- Keep your API keys secure and rotate them regularly
- Use environment-specific values (dev vs prod)