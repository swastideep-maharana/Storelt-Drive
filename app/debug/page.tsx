"use client";

import { useState } from "react";
import {
  validateAppwriteConfig,
  getAppwriteStatus,
  ValidationResult,
} from "@/lib/appwrite/validator";

interface StatusResult {
  status: string;
  message: string;
}

export default function DebugPage() {
  const [validationResult, setValidationResult] =
    useState<ValidationResult | null>(null);
  const [status, setStatus] = useState<StatusResult | null>(null);
  const [loading, setLoading] = useState(false);

  const runValidation = async () => {
    setLoading(true);
    try {
      const result = await validateAppwriteConfig();
      setValidationResult(result);
    } catch (error) {
      setValidationResult({
        isValid: false,
        errors: [String(error)],
        warnings: [],
      });
    }
    setLoading(false);
  };

  const checkStatus = async () => {
    setLoading(true);
    try {
      const result = await getAppwriteStatus();
      setStatus(result);
    } catch (error) {
      setStatus({ status: "error", message: String(error) });
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Appwrite Configuration Debug</h1>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Endpoint:</strong>{" "}
              {process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "Not set"}
            </div>
            <div>
              <strong>Project:</strong>{" "}
              {process.env.NEXT_PUBLIC_APPWRITE_PROJECT || "Not set"}
            </div>
            <div>
              <strong>Database:</strong>{" "}
              {process.env.NEXT_PUBLIC_APPWRITE_DATABASE || "Not set"}
            </div>
            <div>
              <strong>Users Collection:</strong>{" "}
              {process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION || "Not set"}
            </div>
            <div>
              <strong>Files Collection:</strong>{" "}
              {process.env.NEXT_PUBLIC_APPWRITE_FILES_COLLECTION || "Not set"}
            </div>
            <div>
              <strong>Bucket:</strong>{" "}
              {process.env.NEXT_PUBLIC_APPWRITE_BUCKET || "Not set"}
            </div>
            <div>
              <strong>Secret Key:</strong>{" "}
              {process.env.NEXT_APPWRITE_SECRET ? "Set" : "Not set"}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Connection Test</h2>
          <button
            onClick={checkStatus}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Testing..." : "Test Connection"}
          </button>

          {status && (
            <div
              className={`mt-4 p-4 rounded ${status.status === "connected" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
            >
              <strong>Status:</strong> {status.status}
              <br />
              <strong>Message:</strong> {status.message}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Full Validation</h2>
          <button
            onClick={runValidation}
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? "Validating..." : "Run Full Validation"}
          </button>

          {validationResult && (
            <div className="mt-4 space-y-4">
              <div
                className={`p-4 rounded ${validationResult.isValid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
              >
                <strong>Overall Status:</strong>{" "}
                {validationResult.isValid ? "Valid" : "Invalid"}
              </div>

              {validationResult.errors.length > 0 && (
                <div className="bg-red-100 p-4 rounded">
                  <strong className="text-red-800">Errors:</strong>
                  <ul className="list-disc list-inside mt-2 text-red-700">
                    {validationResult.errors.map(
                      (error: string, index: number) => (
                        <li key={index}>{error}</li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {validationResult.warnings.length > 0 && (
                <div className="bg-yellow-100 p-4 rounded">
                  <strong className="text-yellow-800">Warnings:</strong>
                  <ul className="list-disc list-inside mt-2 text-yellow-700">
                    {validationResult.warnings.map(
                      (warning: string, index: number) => (
                        <li key={index}>{warning}</li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Quick Fix Steps</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>
              Create a <code>.env.local</code> file with all required
              environment variables
            </li>
            <li>
              Go to Appwrite Console → Database → Collections → Set all
              permissions to &quot;Any&quot;
            </li>
            <li>
              Go to Appwrite Console → Storage → Bucket → Set all permissions to
              &quot;Any&quot;
            </li>
            <li>
              Go to Appwrite Console → Settings → API Keys → Ensure secret key
              has all permissions
            </li>
            <li>Restart your development server</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
