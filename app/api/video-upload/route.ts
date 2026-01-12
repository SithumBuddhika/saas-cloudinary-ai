// import { NextRequest, NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";
// import { auth } from "@clerk/nextjs/server";
// import { prisma } from "@/lib/prisma";

// export const runtime = "nodejs";

// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,

//   // ✅ prevents Cloudinary SDK from giving up too early
//   timeout: 5 * 60 * 1000, // 5 minutes
// });

// type CloudinaryUploadResult = {
//   public_id: string;
//   bytes: number;
//   duration?: number;
//   [key: string]: any;
// };

// export async function POST(request: NextRequest) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
//     const apiKey = process.env.CLOUDINARY_API_KEY;
//     const apiSecret = process.env.CLOUDINARY_API_SECRET;

//     if (!cloudName || !apiKey || !apiSecret) {
//       return NextResponse.json(
//         { error: "Cloudinary credentials not found" },
//         { status: 500 }
//       );
//     }

//     // ✅ Parse form data
//     const formData = await request.formData();
//     const file = formData.get("file") as File | null;

//     const title = String(formData.get("title") ?? "").trim();
//     const descriptionRaw = formData.get("description");
//     const description = descriptionRaw ? String(descriptionRaw).trim() : null;

//     if (!file) {
//       return NextResponse.json({ error: "File not found" }, { status: 400 });
//     }
//     if (!title) {
//       return NextResponse.json({ error: "Title is required" }, { status: 400 });
//     }

//     // ✅ max 70MB guard
//     const MAX_FILE_SIZE = 70 * 1024 * 1024;
//     if (file.size > MAX_FILE_SIZE) {
//       return NextResponse.json(
//         { error: "File size too large (max 70MB)" },
//         { status: 400 }
//       );
//     }

//     const originalSizeRaw = formData.get("originalSize");
//     const originalSize =
//       originalSizeRaw != null ? String(originalSizeRaw) : String(file.size);

//     // ✅ Upload ORIGINAL only (fast + reliable)
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const result = await new Promise<CloudinaryUploadResult>(
//       (resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           {
//             resource_type: "video",
//             folder: `video-uploads/${userId}`,
//             // ✅ do NOT do eager compression here (it causes timeouts)
//             // ✅ let delivery transformations handle preview/thumb
//           },
//           (error, uploadResult) => {
//             if (error) return reject(error);
//             resolve(uploadResult as CloudinaryUploadResult);
//           }
//         );

//         uploadStream.end(buffer);
//       }
//     );

//     // ✅ Store in DB
//     // NOTE: your Prisma schema has duration Float -> store number
//     // compressedSize: we don’t have real compressed bytes here (that was eager),
//     // so store the same as original for now. UI will show 0% until you add async compression.
//     const video = await prisma.video.create({
//       data: {
//         userId,
//         title,
//         description,
//         publicId: result.public_id,
//         originalSize: String(originalSize),
//         compressedSize: String(originalSize), // ✅ stable
//         duration: Number(result.duration ?? 0),
//       },
//     });

//     return NextResponse.json(video, { status: 200 });
//   } catch (error: any) {
//     console.error("Upload video failed:", error);

//     const cloudMsg =
//       error?.error?.message || error?.message || "Upload video failed";

//     return NextResponse.json({ error: cloudMsg }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  // helps with larger uploads / slower connections
  timeout: 10 * 60 * 1000, // 10 minutes
});

type CloudinaryEagerItem = {
  bytes?: number;
  secure_url?: string;
  url?: string;
  public_id?: string;
};

type CloudinaryUploadResult = {
  public_id: string;
  bytes: number;
  duration?: number;
};

type CloudinaryExplicitResult = {
  eager?: CloudinaryEagerItem[];
};

export async function POST(request: NextRequest) {
  try {
    // 1) Auth
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2) Validate env
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        { error: "Cloudinary credentials not found" },
        { status: 500 }
      );
    }

    // 3) Read formData
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    const title = String(formData.get("title") ?? "").trim();
    const descriptionRaw = formData.get("description");
    const description = descriptionRaw ? String(descriptionRaw).trim() : null;

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 400 });
    }
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // hard guard (same as UI)
    const MAX_FILE_SIZE = 70 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size too large (max 70MB)" },
        { status: 400 }
      );
    }

    const originalSizeRaw = formData.get("originalSize");
    const originalSize =
      originalSizeRaw != null ? String(originalSizeRaw) : String(file.size);

    // 4) Upload original to Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploaded = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "video",
            folder: "video-uploads",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result as CloudinaryUploadResult);
          }
        );

        uploadStream.end(buffer);
      }
    );

    // 5) Generate REAL compressed asset + poster (derived assets)
    //    This is what makes compressedSize meaningful
    const explicitRes = (await cloudinary.uploader.explicit(
      uploaded.public_id,
      {
        type: "upload",
        resource_type: "video",
        eager: [
          // ✅ compressed mp4 (make bitrate lower = real savings)
          {
            fetch_format: "mp4",
            quality: "auto:good",
            video_codec: "h264",
            bit_rate: "800k",
            audio_codec: "aac",
          },
          // ✅ poster thumbnail
          {
            fetch_format: "jpg",
            width: 960,
            height: 540,
            crop: "fill",
            gravity: "auto",
            start_offset: "0",
          },
        ],
        eager_async: false,
      }
    )) as CloudinaryExplicitResult;

    const eagerCompressed = explicitRes.eager?.[0];
    const compressedBytes =
      typeof eagerCompressed?.bytes === "number"
        ? eagerCompressed.bytes
        : uploaded.bytes;

    // 6) Save to DB
    const video = await prisma.video.create({
      data: {
        userId,
        title,
        description,
        publicId: uploaded.public_id,
        originalSize: String(originalSize),
        compressedSize: String(compressedBytes),
        duration: Number(uploaded.duration ?? 0),
      },
    });

    return NextResponse.json(video, { status: 200 });
  } catch (error: any) {
    console.error("Upload video failed:", error);

    const cloudErr =
      error?.error?.message || error?.message || "Upload video failed";

    return NextResponse.json({ error: cloudErr }, { status: 500 });
  }
}
