-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "compressedPublicId" TEXT,
ADD COLUMN     "compressedReady" BOOLEAN NOT NULL DEFAULT false;
