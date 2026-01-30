# Vercel Deployment Guide

## Prerequisites

1. A Supabase project with the database schema set up (see `DATABASE_SETUP.md`)
2. A Vercel account

## Environment Variables

In your Vercel project settings, add the following environment variables:

### Required Variables

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Optional Variables (recommended for server-side operations)

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

## Deployment Steps

### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Configure environment variables in project settings
5. Click "Deploy"

## Build Configuration

The project uses Next.js 16 with Turbopack. Vercel will automatically detect the Next.js framework and use the correct build settings:

- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)
- **Framework Preset**: Next.js

## Troubleshooting

### Build Errors

1. **Environment Variables Missing**: Ensure all required environment variables are set in Vercel project settings
2. **Supabase Connection**: Verify your Supabase URL and anon key are correct
3. **Node Version**: The project requires Node.js 18.x or higher

### Runtime Errors

1. **Database Connection**: Check that your Supabase project is active and accessible
2. **CORS Issues**: Supabase should allow requests from your Vercel domain by default
3. **Authentication Issues**: Ensure your Supabase auth settings allow the required providers

## Post-Deployment

1. Verify the homepage loads correctly
2. Test authentication flows (sign up, login)
3. Test product catalog browsing
4. Verify cart and wishlist functionality

## Performance

The project includes:
- Static page generation (SSG) for catalog pages
- 5-minute revalidation for product data
- Caching for database queries
- Optimized images with Next.js Image component

## Support

For issues related to:
- **Next.js**: See [Next.js Documentation](https://nextjs.org/docs)
- **Vercel**: See [Vercel Documentation](https://vercel.com/docs)
- **Supabase**: See [Supabase Documentation](https://supabase.com/docs)
