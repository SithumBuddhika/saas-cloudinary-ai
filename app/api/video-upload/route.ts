// import { NextRequest, NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";
// import { auth } from "@clerk/nextjs/server";
// import { PrismaClient } from "@prisma/client/extension";

// const prisma = new PrismaClient();

// // Configuration
// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
// });

// interface CloudinaryUploadResult {
//   public_id: string;
//   bytes: number;
//   duration?: number;
//   [key: string]: any;
// }

// export async function POST(request: NextRequest) {
//   try {
//     //todo to check user

//     if (
//       !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
//       !process.env.CLOUDINARY_API_KEY ||
//       !process.env.CLOUDINARY_API_SECRET
//     ) {
//       return NextResponse.json(
//         { error: "Cloudinary credentials not found" },
//         { status: 500 }
//       );
//     }

//     const formData = await request.formData();
//     const file = formData.get("file") as File | null;
//     const title = formData.get("title") as string;
//     const description = formData.get("description") as string;
//     const originalSize = formData.get("originalSize") as string;

//     if (!file) {
//       return NextResponse.json({ error: "File not found" }, { status: 400 });
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const result = await new Promise<CloudinaryUploadResult>(
//       (resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           {
//             resource_type: "video",
//             folder: "video-uploads",
//             transformation: [{ quality: "auto", fetch_format: "mp4" }],
//           },
//           (error, result) => {
//             if (error) reject(error);
//             else resolve(result as CloudinaryUploadResult);
//           }
//         );
//         uploadStream.end(buffer);
//       }
//     );
//     const video = await prisma.video.create({
//       data: {
//         title,
//         description,
//         publicId: result.public_id,
//         originalSize: originalSize,
//         compressedSize: String(result.bytes),
//         duration: result.duration || 0,
//       },
//     });
//     return NextResponse.json(video);
//   } catch (error) {
//     console.log("UPload video failed", error);
//     return NextResponse.json({ error: "UPload video failed" }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// import { NextRequest, NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";
// import { auth } from "@clerk/nextjs/server";
// import { prisma } from "@/lib/prisma";

// export const runtime = "nodejs"; // ✅ Buffer + cloudinary needs node runtime

// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// interface CloudinaryUploadResult {
//   public_id: string;
//   bytes: number;
//   duration?: number;
//   [key: string]: any;
// }

// export async function POST(request: NextRequest) {
//   try {
//     // ✅ 1) Check user (Clerk)
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // ✅ 2) Validate Cloudinary envs
//     if (
//       !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
//       !process.env.CLOUDINARY_API_KEY ||
//       !process.env.CLOUDINARY_API_SECRET
//     ) {
//       return NextResponse.json(
//         { error: "Cloudinary credentials not found" },
//         { status: 500 }
//       );
//     }

//     // ✅ 3) Read form data
//     const formData = await request.formData();
//     const file = formData.get("file") as File | null;

//     const title = String(formData.get("title") ?? "").trim();
//     const descriptionRaw = formData.get("description");
//     const description = descriptionRaw ? String(descriptionRaw).trim() : null;

//     const originalSizeRaw = formData.get("originalSize");
//     const originalSize = originalSizeRaw
//       ? String(originalSizeRaw)
//       : String(file?.size ?? 0);

//     if (!file) {
//       return NextResponse.json({ error: "File not found" }, { status: 400 });
//     }
//     if (!title) {
//       return NextResponse.json({ error: "Title is required" }, { status: 400 });
//     }

//     // ✅ 4) Upload to Cloudinary
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const result = await new Promise<CloudinaryUploadResult>(
//       (resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           {
//             resource_type: "video",
//             folder: "video-uploads",
//             transformation: [{ quality: "auto", fetch_format: "mp4" }],
//           },
//           (error, result) => {
//             if (error) return reject(error);
//             resolve(result as CloudinaryUploadResult);
//           }
//         );

//         uploadStream.end(buffer);
//       }
//     );

//     // ✅ 5) Save to DB (owned by user)
//     const video = await prisma.video.create({
//       data: {
//         userId, // ✅ important
//         title,
//         description,
//         publicId: result.public_id,
//         originalSize,
//         compressedSize: String(result.bytes),
//         duration: String(result.duration ?? 0), // ✅ your model uses String
//       },
//     });

//     return NextResponse.json(video, { status: 200 });
//   } catch (error) {
//     console.log("Upload video failed", error);
//     return NextResponse.json({ error: "Upload video failed" }, { status: 500 });
//   }
// }

// import { NextRequest, NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";
// import { auth } from "@clerk/nextjs/server";
// import { prisma } from "@/lib/prisma";

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";

// cloudinary.config({
//   // ✅ use server env (recommended)
//   cloud_name:
//     process.env.CLOUDINARY_CLOUD_NAME ||
//     process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// interface CloudinaryUploadResult {
//   public_id: string;
//   bytes: number;
//   duration?: number;
//   secure_url?: string;
//   [key: string]: any;
// }

// export async function POST(request: NextRequest) {
//   try {
//     // ✅ 1) Check user (Clerk)
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // ✅ 2) Validate Cloudinary envs
//     const cloudName =
//       process.env.CLOUDINARY_CLOUD_NAME ||
//       process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

//     if (
//       !cloudName ||
//       !process.env.CLOUDINARY_API_KEY ||
//       !process.env.CLOUDINARY_API_SECRET
//     ) {
//       return NextResponse.json(
//         {
//           error: "Cloudinary credentials not found",
//           details:
//             "Missing CLOUDINARY_CLOUD_NAME (or NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME), CLOUDINARY_API_KEY, or CLOUDINARY_API_SECRET",
//         },
//         { status: 500 }
//       );
//     }

//     // ✅ 3) Read form data
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

//     // ✅ use file.size as fallback
//     const originalSizeRaw = formData.get("originalSize");
//     const originalSize = originalSizeRaw
//       ? String(originalSizeRaw)
//       : String(file.size);

//     // ✅ 4) Upload to Cloudinary
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const result = await new Promise<CloudinaryUploadResult>(
//       (resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           {
//             resource_type: "video",
//             folder: "video-uploads",
//             // ✅ keep simple; Cloudinary auto-optimizes delivery anyway
//             // transformation: [{ quality: "auto", fetch_format: "mp4" }],
//           },
//           (error, result) => {
//             if (error) return reject(error);
//             resolve(result as CloudinaryUploadResult);
//           }
//         );

//         uploadStream.end(buffer);
//       }
//     );

//     // ✅ 5) Save to DB (owned by user)
//     // IMPORTANT FIX: duration is Float in Prisma → store number, not string
//     const video = await prisma.video.create({
//       data: {
//         userId,
//         title,
//         description,
//         publicId: result.public_id,
//         originalSize, // String (matches schema)
//         compressedSize: String(result.bytes), // String (matches schema)
//         duration: Number(result.duration ?? 0), // ✅ Float (matches schema)
//       },
//     });

//     return NextResponse.json(video, { status: 200 });
//   } catch (error: any) {
//     console.log("Upload video failed", error);

//     // ✅ return real details so you can debug
//     return NextResponse.json(
//       {
//         error: "Upload video failed",
//         details: error?.message || String(error),
//       },
//       { status: 500 }
//     );
//   }
// }

// import { NextRequest, NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";
// import { auth } from "@clerk/nextjs/server";
// import { prisma } from "@/lib/prisma";
// import { Readable } from "stream";

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";

// cloudinary.config({
//   cloud_name:
//     process.env.CLOUDINARY_CLOUD_NAME ||
//     process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true,
// });

// interface CloudinaryUploadResult {
//   public_id: string;
//   bytes: number;
//   duration?: number;
//   secure_url?: string;
//   [key: string]: any;
// }

// export async function POST(request: NextRequest) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const cloudName =
//       process.env.CLOUDINARY_CLOUD_NAME ||
//       process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

//     if (
//       !cloudName ||
//       !process.env.CLOUDINARY_API_KEY ||
//       !process.env.CLOUDINARY_API_SECRET
//     ) {
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

//     if (!file) {
//       return NextResponse.json({ error: "File not found" }, { status: 400 });
//     }
//     if (!title) {
//       return NextResponse.json({ error: "Title is required" }, { status: 400 });
//     }

//     const originalSizeRaw = formData.get("originalSize");
//     const originalSize = originalSizeRaw
//       ? String(originalSizeRaw)
//       : String(file.size);

//     // ✅ Read file into Buffer
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     // ✅ Chunked upload (fixes 499 timeouts)
//     // Cloudinary chunk size: pick 6MB–20MB. 10MB is a good default.
//     const CHUNK_SIZE = 10 * 1024 * 1024;

//     const result = await new Promise<CloudinaryUploadResult>(
//       (resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_large_stream(
//           {
//             resource_type: "video",
//             folder: "video-uploads",
//             chunk_size: CHUNK_SIZE,
//             // optional:
//             // eager: [{ quality: "auto", fetch_format: "mp4" }],
//           },
//           (error, result) => {
//             if (error) return reject(error);
//             resolve(result as CloudinaryUploadResult);
//           }
//         );

//         // Pipe a readable stream into Cloudinary
//         Readable.from(buffer).pipe(uploadStream);
//       }
//     );

//     const video = await prisma.video.create({
//       data: {
//         userId,
//         title,
//         description,
//         publicId: result.public_id,
//         originalSize,
//         compressedSize: String(result.bytes),
//         duration: Number(result.duration ?? 0),
//       },
//     });

//     return NextResponse.json(video, { status: 200 });
//   } catch (error: any) {
//     console.log("Upload video failed", error);

//     return NextResponse.json(
//       {
//         error: "Upload video failed",
//         details: error?.message || error?.error?.message || String(error),
//       },
//       { status: 500 }
//     );
//   }
// }

// import { NextRequest, NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";
// import { auth } from "@clerk/nextjs/server";
// import { prisma } from "@/lib/prisma";

// export const runtime = "nodejs"; // ✅ required for Buffer + Cloudinary

// cloudinary.config({
//   // ✅ better to use server-only var, but your NEXT_PUBLIC one is OK too
//   cloud_name:
//     process.env.CLOUDINARY_CLOUD_NAME ||
//     process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// type CloudinaryUploadResult = {
//   public_id: string;
//   bytes: number;
//   duration?: number;
//   secure_url?: string;
//   format?: string;
//   resource_type?: string;
//   [key: string]: any;
// };

// export async function POST(request: NextRequest) {
//   try {
//     // ✅ 1) Auth
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // ✅ 2) Validate env
//     const cloudName =
//       process.env.CLOUDINARY_CLOUD_NAME ||
//       process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
//     if (
//       !cloudName ||
//       !process.env.CLOUDINARY_API_KEY ||
//       !process.env.CLOUDINARY_API_SECRET
//     ) {
//       return NextResponse.json(
//         { error: "Cloudinary credentials not found" },
//         { status: 500 }
//       );
//     }

//     // ✅ 3) Read form data
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

//     const originalSize = String(formData.get("originalSize") ?? file.size ?? 0);

//     // ✅ 4) Upload to Cloudinary (FIX: use upload_stream)
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const result = await new Promise<CloudinaryUploadResult>(
//       (resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           {
//             resource_type: "video",
//             folder: "video-uploads",

//             // ✅ helps with larger uploads
//             chunk_size: 6_000_000,

//             // ✅ reduce timeouts on slower networks (ms)
//             timeout: 300_000,

//             // ✅ optional - Cloudinary can auto optimize
//             // transformation: [{ quality: "auto", fetch_format: "mp4" }],
//           },
//           (error, uploaded) => {
//             if (error) return reject(error);
//             resolve(uploaded as CloudinaryUploadResult);
//           }
//         );

//         uploadStream.end(buffer);
//       }
//     );

//     // ✅ 5) Save to DB (FIX: duration is Float in your schema)
//     const video = await prisma.video.create({
//       data: {
//         userId,
//         title,
//         description,
//         publicId: result.public_id,
//         originalSize,
//         compressedSize: String(result.bytes),
//         duration: Number(result.duration ?? 0), // ✅ FLOAT
//       },
//     });

//     return NextResponse.json(video, { status: 200 });
//   } catch (error: any) {
//     console.log("Upload video failed", error);

//     // ✅ return real error to frontend so you see it in UI
//     return NextResponse.json(
//       {
//         error: "Upload video failed",
//         details: error?.message || "Unknown error",
//       },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs"; // ✅ required for Buffer + Cloudinary SDK

// NOTE: Cloudinary server-side config must use NON-public envs
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, // ok to read, but still server
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type CloudinaryEagerItem = {
  secure_url?: string;
  url?: string;
  bytes?: number;
  format?: string;
  resource_type?: string;
  public_id?: string;
};

type CloudinaryUploadResult = {
  public_id: string;
  bytes: number;
  duration?: number;
  eager?: CloudinaryEagerItem[];
  [key: string]: any;
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

    // 3) Read form data
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

    const originalSizeRaw = formData.get("originalSize");
    const originalSize =
      originalSizeRaw != null
        ? String(originalSizeRaw)
        : String(file.size ?? 0);

    // Optional: server-side max size guard (70MB)
    const MAX_FILE_SIZE = 70 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size too large (max 70MB)" },
        { status: 400 }
      );
    }

    // 4) Convert file to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 5) Upload to Cloudinary with eager transforms
    //    eager[0] => compressed mp4
    //    eager[1] => poster jpg
    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "video",
            folder: "video-uploads",

            // ✅ generate derived assets immediately (so we can measure real compression)
            eager: [
              // Compressed MP4 (delivery-ready)
              {
                fetch_format: "mp4",
                quality: "auto",
                video_codec: "h264",
                bit_rate: "900k",
              },
              // Poster thumbnail (jpg)
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
          },
          (error, uploadResult) => {
            if (error) return reject(error);
            resolve(uploadResult as CloudinaryUploadResult);
          }
        );

        uploadStream.end(buffer);
      }
    );

    const eagerCompressed = result.eager?.[0];
    const eagerPoster = result.eager?.[1];

    const compressedBytes =
      typeof eagerCompressed?.bytes === "number"
        ? eagerCompressed.bytes
        : result.bytes; // fallback

    // 6) Save to DB (duration is Float in your schema => Number)
    const video = await prisma.video.create({
      data: {
        userId,
        title,
        description,
        publicId: result.public_id,
        originalSize: String(originalSize),
        compressedSize: String(compressedBytes),
        duration: Number(result.duration ?? 0),

        // If you later add fields to Prisma, you can store these too:
        // compressedUrl: eagerCompressed?.secure_url ?? eagerCompressed?.url ?? null,
        // thumbnailUrl: eagerPoster?.secure_url ?? eagerPoster?.url ?? null,
      },
    });

    return NextResponse.json(video, { status: 200 });
  } catch (error: any) {
    console.error("Upload video failed:", error);

    // Show Cloudinary error details if present (helps debugging)
    const cloudErr =
      error?.error?.message || error?.message || "Upload video failed";

    return NextResponse.json({ error: cloudErr }, { status: 500 });
  }
}
