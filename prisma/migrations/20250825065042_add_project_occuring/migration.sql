/*
  Warnings:

  - Added the required column `occuring` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Projects" ADD COLUMN     "occuring" "public"."ProjectOccurence" NOT NULL;
