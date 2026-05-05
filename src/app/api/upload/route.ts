import { NextResponse } from "next/server";
import { getCurrentStore } from "@/lib/seller";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

/**
 * Sign client-uploads from Vercel Blob. The client calls `upload(file, ...)`
 * from `@vercel/blob/client`, that first makes POST to this endpoint to request
 * a short-lived token and then uploads directly to Blob storage. The file NEVER
 * passes through our server — avoids the 4.5MB body limit in serverless
 * functions and reduces latency.
 *
 * Auth: only logged-in sellers can upload.
 */
export async function POST(request: Request): Promise<NextResponse> {
  try {
    await getCurrentStore();
  } catch {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith("products/")) {
          throw new Error("INVALID_PATH");
        }
        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/heic",
          ],
          maximumSizeInBytes: 5 * 1024 * 1024, // 5 MB
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {
        // Optional hook. For now the URL is saved by the client via
        // PATCH /api/products/:id, so we don't do anything here.
      },
    });
    return NextResponse.json(jsonResponse);
  } catch (err) {
    return NextResponse.json(
      {
        error: "UPLOAD_FAILED",
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 400 }
    );
  }
}
