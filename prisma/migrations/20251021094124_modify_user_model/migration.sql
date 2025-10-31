-- DropForeignKey
ALTER TABLE "public"."SavePost" DROP CONSTRAINT "SavePost_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SavePost" DROP CONSTRAINT "SavePost_userId_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "location" TEXT,
ADD COLUMN     "skill" TEXT[],
ADD COLUMN     "website" TEXT;

-- AddForeignKey
ALTER TABLE "SavePost" ADD CONSTRAINT "SavePost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavePost" ADD CONSTRAINT "SavePost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
