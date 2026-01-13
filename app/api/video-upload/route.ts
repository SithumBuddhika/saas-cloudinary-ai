// import { NextRequest, NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";
// import { auth } from "@clerk/nextjs/server";
// import { prisma } from "@/lib/prisma";

// export const runtime = "nodejs";

// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   timeout: 10 * 60 * 1000,
// });

// type CloudinaryUploadResult = {
//   public_id: string;
//   bytes: number;
//   duration?: number;
// };

// export async function POST(request: NextRequest) {
//   try {
//     const { userId } = await auth();
//     if (!userId)
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
//     const apiKey = process.env.CLOUDINARY_API_KEY;
//     const apiSecret = process.env.CLOUDINARY_API_SECRET;
//     if (!cloudName || !apiKey || !apiSecret) {
//       return NextResponse.json(
//         { error: "Cloudinary credentials not found" },
//         { status: 500 }
//       );
//     }

//     const formData = await request.formData();
//     const file = formData.get("file") as File | null;

//     const title = String(formData.get("title") ?? "").trim();
//     const descriptionRaw = formData.get("description");
//     const description = descriptionRaw ? String(descriptionRaw).trim() : null;

//     if (!file)
//       return NextResponse.json({ error: "File not found" }, { status: 400 });
//     if (!title)
//       return NextResponse.json({ error: "Title is required" }, { status: 400 });

//     const MAX_FILE_SIZE = 70 * 1024 * 1024;
//     if (file.size > MAX_FILE_SIZE) {
//       return NextResponse.json(
//         { error: "File size too large (max 70MB)" },
//         { status: 400 }
//       );
//     }

//     const originalSize = String(formData.get("originalSize") ?? file.size);

//     // upload original
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const uploaded = await new Promise<CloudinaryUploadResult>(
//       (resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           {
//             resource_type: "video",
//             folder: "video-uploads",
//           },
//           (error, result) => {
//             if (error) return reject(error);
//             resolve(result as CloudinaryUploadResult);
//           }
//         );
//         uploadStream.end(buffer);
//       }
//     );

//     // create DB record (compression not ready yet)
//     const video = await prisma.video.create({
//       data: {
//         userId,
//         title,
//         description,
//         publicId: uploaded.public_id,
//         originalSize,
//         compressedSize: originalSize, // temporary
//         duration: Number(uploaded.duration ?? 0),

//         compressedReady: false,
//         compressedPublicId: null,
//       },
//     });

//     return NextResponse.json(video, { status: 200 });
//   } catch (error: any) {
//     console.error("Upload video failed:", error);
//     const msg =
//       error?.error?.message || error?.message || "Upload video failed";
//     return NextResponse.json({ error: msg }, { status: 500 });
//   }
// }

////////////////////////////////

// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import { prisma } from "@/lib/prisma";

// export const runtime = "nodejs";

// export async function POST(request: NextRequest) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const body = await request.json();

//     const title = String(body?.title ?? "").trim();
//     const description =
//       body?.description != null && String(body.description).trim()
//         ? String(body.description).trim()
//         : null;

//     const publicId = String(body?.publicId ?? "").trim();
//     const originalSize = String(body?.originalSize ?? "0");
//     const uploadedSize = String(body?.uploadedSize ?? originalSize);
//     const duration = Number(body?.duration ?? 0);

//     if (!title) {
//       return NextResponse.json({ error: "Title is required" }, { status: 400 });
//     }
//     if (!publicId) {
//       return NextResponse.json(
//         { error: "publicId is required" },
//         { status: 400 }
//       );
//     }

//     // ✅ create DB record (compression not ready yet)
//     const video = await prisma.video.create({
//       data: {
//         userId,
//         title,
//         description,
//         publicId,
//         originalSize,
//         compressedSize: uploadedSize, // temporary; compress job updates later
//         duration,
//         compressedReady: false,
//         compressedPublicId: null,
//       },
//     });

//     return NextResponse.json(video, { status: 200 });
//   } catch (error: any) {
//     console.error("Upload video failed:", error);
//     const msg = error?.message || "Upload video failed";
//     return NextResponse.json({ error: msg }, { status: 500 });
//   }
// }

////////////////////
//! This working for Normal Upload
// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import { prisma } from "@/lib/prisma";

// export const runtime = "nodejs";

// export async function POST(request: NextRequest) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const body = await request.json();

//     const title = String(body?.title ?? "").trim();
//     const description =
//       body?.description != null && String(body.description).trim()
//         ? String(body.description).trim()
//         : null;

//     const publicId = String(body?.publicId ?? "").trim();
//     const originalSize = String(body?.originalSize ?? "0");
//     const uploadedSize = String(body?.uploadedSize ?? originalSize);
//     const duration = Number(body?.duration ?? 0);

//     if (!title) {
//       return NextResponse.json({ error: "Title is required" }, { status: 400 });
//     }
//     if (!publicId) {
//       return NextResponse.json(
//         { error: "publicId is required" },
//         { status: 400 }
//       );
//     }

//     const video = await prisma.video.create({
//       data: {
//         userId,
//         title,
//         description,
//         publicId,
//         originalSize,
//         compressedSize: uploadedSize, // temp, compress route updates later
//         duration,
//         compressedReady: false,
//         compressedPublicId: null,
//       },
//     });

//     return NextResponse.json(video, { status: 200 });
//   } catch (error: any) {
//     console.error("Upload video failed:", error);
//     const msg = error?.message || "Upload video failed";
//     return NextResponse.json({ error: msg }, { status: 500 });
//   }
// }

//!!!!!!
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
