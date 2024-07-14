-- AlterTable
ALTER TABLE "User" ADD COLUMN     "thread_id" INTEGER;

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "userId" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Message_id_key" ON "Message"("id");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
