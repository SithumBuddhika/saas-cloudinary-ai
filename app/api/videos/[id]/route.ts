// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import { prisma } from "@/lib/prisma";
// import { v2 as cloudinary } from "cloudinary";

// export const runtime = "nodejs";

// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export async function DELETE(
//   _req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const video = await prisma.video.findUnique({
//       where: { id: params.id },
//     });

//     if (!video || video.userId !== userId) {
//       return NextResponse.json({ error: "Not found" }, { status: 404 });
//     }

//     // delete from Cloudinary first
//     await cloudinary.uploader.destroy(video.publicId, {
//       resource_type: "video",
//     });

//     // delete from DB
//     await prisma.video.delete({ where: { id: video.id } });

//     return NextResponse.json({ ok: true });
//   } catch (err: any) {
//     console.error("Delete failed:", err);
//     return NextResponse.json(
//       { error: err?.message || "Delete failed" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";

// Cloudinary config (server-side)
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type RouteContext = {
  params: Promise<{ id: string }> | { id: string };
};

export async function DELETE(_req: Request, ctx: RouteContext) {
  try {
    // ✅ Clerk auth
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Next 16: params may be async
    const params = await Promise.resolve(ctx.params);
    const id = params?.id;

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    // ✅ DB lookup
    const video = await prisma.video.findUnique({ where: { id } });

    if (!video || video.userId !== userId) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // ✅ Delete Cloudinary asset (don’t fail hard if already deleted)
    try {
      await cloudinary.uploader.destroy(video.publicId, {
        resource_type: "video",
        invalidate: true,
      });
    } catch (cloudErr) {
      console.warn("Cloudinary delete warning:", cloudErr);
      // We continue anyway (DB delete should still happen)
    }

    // ✅ Delete DB row
    await prisma.video.delete({ where: { id: video.id } });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    console.error("Delete failed:", err);
    return NextResponse.json(
      { error: err?.message || "Delete failed" },
      { status: 500 }
    );
  }
}
