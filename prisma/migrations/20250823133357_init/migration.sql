/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Project` table. All the data in the column will be lost.
  - Made the column `projectDescription` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Project" DROP COLUMN "updatedAt",
ALTER COLUMN "projectDescription" SET NOT NULL;
