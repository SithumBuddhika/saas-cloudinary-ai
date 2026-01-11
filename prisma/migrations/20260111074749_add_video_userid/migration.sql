/*
  Warnings:

  - Added the required column `userId` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `duration` on the `Video` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "userId" TEXT NOT NULL,
DROP COLUMN "duration",
ADD COLUMN     "duration" DOUBLE PRECISION NOT NULL;
