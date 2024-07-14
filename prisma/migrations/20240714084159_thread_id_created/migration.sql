-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "isKaiMessage" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "thread_id" SET DATA TYPE TEXT;
