# Appwrite Setup Guide

## 1. Environment Variables
Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE=your_database_id
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=your_users_collection_id
NEXT_PUBLIC_APPWRITE_FILES_COLLECTION=your_files_collection_id
NEXT_PUBLIC_APPWRITE_BUCKET=your_bucket_id
NEXT_APPWRITE_SECRET=your_secret_key
```

## 2. Appwrite Console Setup

### Database Collections
1. Go to Database → Your Database → Collections
2. For **Users Collection**:
   - Create: `role:all`
   - Read: `role:all`
   - Update: `role:all`
   - Delete: `role:all`
3. For **Files Collection**:
   - Create: `role:all`
   - Read: `role:all`
   - Update: `role:all`
   - Delete: `role:all`

### Storage Bucket
1. Go to Storage → Your Bucket → Settings
2. Set file permissions:
   - Create: `role:all`
   - Read: `role:all`
   - Update: `role:all`
   - Delete: `role:all`

### API Keys
1. Go to Settings → API Keys
2. Ensure your secret key has:
   - Users (read, write)
   - Databases (read, write)
   - Storage (read, write)

## 3. Collection Schemas

### Users Collection Attributes:
- `fullName` (string, required)
- `email` (string, required, unique)
- `avatar` (string, required)
- `accountId` (string, required)

### Files Collection Attributes:
- `type` (string, required)
- `name` (string, required)
- `url` (string, required)
- `extension` (string, required)
- `size` (integer, required)
- `owner` (string, required)
- `accountId` (string, required)
- `users` (string[], required)
- `bucketFileId` (string, required)

## 4. Quick Fix for Development
Set all permissions to "Any" temporarily for testing. 