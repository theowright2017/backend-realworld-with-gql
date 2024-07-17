-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "bio" TEXT,
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "username" TEXT NOT NULL,
    "bio" TEXT,
    "image" TEXT,
    "following" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "SingleArticle" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "favourited" BOOLEAN NOT NULL DEFAULT false,
    "favouritesCount" INTEGER NOT NULL,
    "authorName" TEXT NOT NULL,

    CONSTRAINT "SingleArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SingleComment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "body" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,

    CONSTRAINT "SingleComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "tagName" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_username_key" ON "Profile"("username");

-- CreateIndex
CREATE UNIQUE INDEX "SingleArticle_authorName_key" ON "SingleArticle"("authorName");

-- CreateIndex
CREATE UNIQUE INDEX "SingleComment_authorName_key" ON "SingleComment"("authorName");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_tagName_key" ON "Tag"("tagName");

-- AddForeignKey
ALTER TABLE "SingleArticle" ADD CONSTRAINT "SingleArticle_authorName_fkey" FOREIGN KEY ("authorName") REFERENCES "Profile"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SingleComment" ADD CONSTRAINT "SingleComment_authorName_fkey" FOREIGN KEY ("authorName") REFERENCES "Profile"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "SingleArticle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
