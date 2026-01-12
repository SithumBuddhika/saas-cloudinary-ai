import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type EagerItem = {
  bytes?: number;
  secure_url?: string;
  url?: string;
};

type ExplicitResult = {
  eager?: EagerItem[];
};

export async function POST(
  _req: Request,
  ctx: { params: Promise<{ id: string }> } // ✅ Next 16 params is async
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await ctx.params;
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const video = await prisma.video.findUnique({ where: { id } });
    if (!video || video.userId !== userId) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // ✅ IMPORTANT:
    // We DO NOT create a new publicId. We just force Cloudinary to create a derived "eager"
    // and then read its bytes for real compression stats.
    const explicitRes = (await cloudinary.uploader.explicit(video.publicId, {
      resource_type: "video",
      type: "upload",
      eager_async: false,
      eager: [
        {
          fetch_format: "mp4",
          quality: "auto",
          video_codec: "h264",
          audio_codec: "aac",
          bit_rate: "900k",
        },
      ],
    })) as ExplicitResult;

    const eager0 = explicitRes?.eager?.[0];

    const compressedBytes =
      typeof eager0?.bytes === "number"
        ? eager0.bytes
        : Number(video.compressedSize || video.originalSize);

    const updated = await prisma.video.update({
      where: { id: video.id },
      data: {
        compressedSize: String(compressedBytes),
        compressedReady: true,

        // ✅ no fake publicId
        // keep null OR store the original publicId
        compressedPublicId: null,
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (err: any) {
    console.error("Compression failed:", err);
    return NextResponse.json(
      { error: err?.error?.message || err?.message || "Compression failed" },
      { status: 500 }
    );
  }
}
