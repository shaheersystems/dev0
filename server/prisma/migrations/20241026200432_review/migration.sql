-- CreateEnum
CREATE TYPE "ReviewType" AS ENUM ('HUMAN', 'AI');

-- CreateTable
CREATE TABLE "Reviews" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'New Review',
    "type" "ReviewType" NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_id_key" ON "Reviews"("id");

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
