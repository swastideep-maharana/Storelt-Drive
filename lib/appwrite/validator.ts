"use server";

import { createAdminClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export const validateAppwriteConfig = async (): Promise<ValidationResult> => {
  const errors: string[] = [];
  const warnings: string[] = [];

  try {
    // Check if all environment variables are set
    const requiredEnvVars = [
      "NEXT_PUBLIC_APPWRITE_ENDPOINT",
      "NEXT_PUBLIC_APPWRITE_PROJECT",
      "NEXT_PUBLIC_APPWRITE_DATABASE",
      "NEXT_PUBLIC_APPWRITE_USERS_COLLECTION",
      "NEXT_PUBLIC_APPWRITE_FILES_COLLECTION",
      "NEXT_PUBLIC_APPWRITE_BUCKET",
      "NEXT_APPWRITE_SECRET",
    ];

    for (const envVar of requiredEnvVars) {
      const value = process.env[envVar];
      if (!value) {
        errors.push(`Missing environment variable: ${envVar}`);
      }
    }

    if (errors.length > 0) {
      return { isValid: false, errors, warnings };
    }

    // Test connection to Appwrite
    const { databases, storage } = await createAdminClient();

    // Test database access
    try {
      await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        []
      );
    } catch (error) {
      errors.push(`Cannot access users collection: ${error}`);
    }

    try {
      await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.filesCollectionId,
        []
      );
    } catch (error) {
      errors.push(`Cannot access files collection: ${error}`);
    }

    // Test storage access
    try {
      await storage.listFiles(appwriteConfig.bucketId);
    } catch (error) {
      errors.push(`Cannot access storage bucket: ${error}`);
    }

    // Check if collections exist
    try {
      await databases.getCollection(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId
      );
    } catch (error) {
      errors.push(`Users collection does not exist: ${error}`);
    }

    try {
      await databases.getCollection(
        appwriteConfig.databaseId,
        appwriteConfig.filesCollectionId
      );
    } catch (error) {
      errors.push(`Files collection does not exist: ${error}`);
    }

    // Add warnings for manual verification
    warnings.push(
      "Please manually verify collection attributes match the required schema"
    );
    warnings.push(
      "Required Users attributes: fullName, email, avatar, accountId"
    );
    warnings.push(
      "Required Files attributes: type, name, url, extension, size, owner, accountId, users, bucketFileId"
    );
  } catch (error) {
    errors.push(`Failed to validate Appwrite configuration: ${error}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

export const getAppwriteStatus = async () => {
  try {
    const { databases } = await createAdminClient();

    // Test basic connectivity
    await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      []
    );

    return { status: "connected", message: "Appwrite connection successful" };
  } catch (error) {
    return {
      status: "error",
      message: `Appwrite connection failed: ${error}`,
    };
  }
};
