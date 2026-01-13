import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

function jsonError(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return jsonError("Unauthorized", 401);

    const contentType = request.headers.get("content-type") || "";

    // -------------------------
    // ✅ JSON MODE (recommended)
    // -------------------------
    if (contentType.includes("application/json")) {
      const body = await request.json();

      const title = String(body?.title ?? "").trim();
      const description =
        body?.description != null && String(body.description).trim()
          ? String(body.description).trim()
          : null;

      const publicId = String(body?.publicId ?? "").trim();
      const originalSize = String(body?.originalSize ?? "0");
      const uploadedSize = String(body?.uploadedSize ?? originalSize);
      const duration = Number(body?.duration ?? 0);

      if (!title) return jsonError("Title is required", 400);
      if (!publicId) return jsonError("publicId is required", 400);

      const video = await prisma.video.create({
        data: {
          userId,
          title,
          description,
          publicId,
          originalSize,
          compressedSize: uploadedSize, // temp; compress job updates later
          duration,
          compressedReady: false,
          compressedPublicId: null,
        },
      });

      return NextResponse.json({ id: video.id, video }, { status: 200 });
    }

    // --------------------------------
    // ✅ FORMDATA MODE (optional backup)
    // --------------------------------
    // If you ever switch back to server upload, keep this.
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();

      const title = String(formData.get("title") ?? "").trim();
      const descriptionRaw = formData.get("description");
      const description = descriptionRaw ? String(descriptionRaw).trim() : null;

      const publicId = String(formData.get("publicId") ?? "").trim();
      const originalSize = String(formData.get("originalSize") ?? "0");
      const uploadedSize = String(formData.get("uploadedSize") ?? originalSize);
      const duration = Number(formData.get("duration") ?? 0);

      if (!title) return jsonError("Title is required", 400);
      if (!publicId) return jsonError("publicId is required", 400);

      const video = await prisma.video.create({
        data: {
          userId,
          title,
          description,
          publicId,
          originalSize,
          compressedSize: uploadedSize,
          duration,
          compressedReady: false,
          compressedPublicId: null,
        },
      });

      return NextResponse.json({ id: video.id, video }, { status: 200 });
    }

    // Unknown content type
    return jsonError("Unsupported content-type", 415);
  } catch (error: any) {
    console.error("Upload video failed:", error);
    const msg = error?.message || "Upload video failed";
    return jsonError(msg, 500);
  }
}
