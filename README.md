# Storelt-Drive

A modern file storage and management application built with Next.js and Appwrite.

## Features

- 🔐 Secure user authentication with email OTP
- 📁 File upload and management
- 🖼️ File type detection and thumbnails
- 📊 Storage usage analytics
- 🔍 File search functionality
- 👥 File sharing capabilities
- 📱 Responsive design

## Prerequisites

- Node.js 18+ 
- Appwrite account and project
- npm, yarn, or pnpm

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd storelt-drive
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT=your_project_id
   NEXT_PUBLIC_APPWRITE_DATABASE=your_database_id
   NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=your_users_collection_id
   NEXT_PUBLIC_APPWRITE_FILES_COLLECTION=your_files_collection_id
   NEXT_PUBLIC_APPWRITE_BUCKET=your_bucket_id
   NEXT_APPWRITE_SECRET=your_secret_key
   ```

4. **Configure Appwrite**
   - Go to your Appwrite Console
   - Set up database collections and storage bucket
   - Configure permissions (see setup guide below)
   - Get your project credentials

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Debug configuration (optional)**
   Visit `http://localhost:3000/debug` to test your Appwrite setup

## Appwrite Setup Guide

### 1. Create Database Collections

**Users Collection:**
- Create: `role:all`
- Read: `role:all`
- Update: `role:all`
- Delete: `role:all`

**Required Attributes:**
- `fullName` (string, required)
- `email` (string, required, unique)
- `avatar` (string, required)
- `accountId` (string, required)

**Files Collection:**
- Create: `role:all`
- Read: `role:all`
- Update: `role:all`
- Delete: `role:all`

**Required Attributes:**
- `type` (string, required)
- `name` (string, required)
- `url` (string, required)
- `extension` (string, required)
- `size` (integer, required)
- `owner` (string, required)
- `accountId` (string, required)
- `users` (string[], required)
- `bucketFileId` (string, required)

### 2. Configure Storage Bucket

Set file permissions to:
- Create: `role:all`
- Read: `role:all`
- Update: `role:all`
- Delete: `role:all`

### 3. API Keys

Ensure your secret key has permissions for:
- Users (read, write)
- Databases (read, write)
- Storage (read, write)

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Troubleshooting

### Common Issues

1. **"Project not found" error**
   - Verify your project ID in `.env.local`
   - Check that the project exists in your Appwrite console

2. **"User unauthorized" error**
   - Set all collection and bucket permissions to "Any" for development
   - Verify your API key has the correct permissions
   - Check that collections and bucket exist

3. **Environment variables not loading**
   - Ensure `.env.local` is in the project root
   - Restart your development server
   - Check variable names match exactly

### Debug Tools

Visit `/debug` page to:
- Check environment variables
- Test Appwrite connection
- Validate configuration
- Get setup instructions

## Tech Stack

- **Framework:** Next.js 15
- **Database:** Appwrite
- **Authentication:** Appwrite Auth
- **Storage:** Appwrite Storage
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React

## License

This project is licensed under the MIT License.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
"# Storelt-Drive" 
