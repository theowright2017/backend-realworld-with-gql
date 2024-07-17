/*
  Warnings:

  - You are about to drop the `SingleArticle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SingleComment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SingleArticle" DROP CONSTRAINT "SingleArticle_authorName_fkey";

-- DropForeignKey
ALTER TABLE "SingleComment" DROP CONSTRAINT "SingleComment_authorName_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_articleId_fkey";

-- DropTable
DROP TABLE "SingleArticle";

-- DropTable
DROP TABLE "SingleComment";

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "favourited" BOOLEAN NOT NULL DEFAULT false,
    "favouritesCount" INTEGER NOT NULL DEFAULT 0,
    "authorName" TEXT NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "body" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_authorName_key" ON "Article"("authorName");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_authorName_key" ON "Comment"("authorName");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_authorName_fkey" FOREIGN KEY ("authorName") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorName_fkey" FOREIGN KEY ("authorName") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
