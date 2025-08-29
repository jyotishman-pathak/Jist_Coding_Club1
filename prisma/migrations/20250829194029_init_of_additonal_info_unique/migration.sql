/*
  Warnings:

  - Made the column `email` on table `AdditionalInfo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."AdditionalInfo" ALTER COLUMN "email" SET NOT NULL;
