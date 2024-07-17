/*
  Warnings:

  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SingleArticle" DROP CONSTRAINT "SingleArticle_authorName_fkey";

-- DropForeignKey
ALTER TABLE "SingleComment" DROP CONSTRAINT "SingleComment_authorName_fkey";

-- DropTable
DROP TABLE "Profile";

-- AddForeignKey
ALTER TABLE "SingleArticle" ADD CONSTRAINT "SingleArticle_authorName_fkey" FOREIGN KEY ("authorName") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SingleComment" ADD CONSTRAINT "SingleComment_authorName_fkey" FOREIGN KEY ("authorName") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
