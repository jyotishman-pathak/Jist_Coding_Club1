/*
  Warnings:

  - You are about to drop the column `email` on the `AdditionalInfo` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `AdditionalInfo` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."AdditionalInfo_email_key";

-- AlterTable
ALTER TABLE "public"."AdditionalInfo" DROP COLUMN "email",
DROP COLUMN "name";
