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

import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs"; // ✅ Buffer + cloudinary needs node runtime

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  public_id: string;
  bytes: number;
  duration?: number;
  [key: string]: any;
}

export async function POST(request: NextRequest) {
  try {
    // ✅ 1) Check user (Clerk)
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ 2) Validate Cloudinary envs
    if (
      !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return NextResponse.json(
        { error: "Cloudinary credentials not found" },
        { status: 500 }
      );
    }

    // ✅ 3) Read form data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    const title = String(formData.get("title") ?? "").trim();
    const descriptionRaw = formData.get("description");
    const description = descriptionRaw ? String(descriptionRaw).trim() : null;

    const originalSizeRaw = formData.get("originalSize");
    const originalSize = originalSizeRaw
      ? String(originalSizeRaw)
      : String(file?.size ?? 0);

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 400 });
    }
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // ✅ 4) Upload to Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "video",
            folder: "video-uploads",
            transformation: [{ quality: "auto", fetch_format: "mp4" }],
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result as CloudinaryUploadResult);
          }
        );

        uploadStream.end(buffer);
      }
    );

    // ✅ 5) Save to DB (owned by user)
    const video = await prisma.video.create({
      data: {
        userId, // ✅ important
        title,
        description,
        publicId: result.public_id,
        originalSize,
        compressedSize: String(result.bytes),
        duration: String(result.duration ?? 0), // ✅ your model uses String
      },
    });

    return NextResponse.json(video, { status: 200 });
  } catch (error) {
    console.log("Upload video failed", error);
    return NextResponse.json({ error: "Upload video failed" }, { status: 500 });
  } finally {
    await prisma.$disconnect;
  }
}
