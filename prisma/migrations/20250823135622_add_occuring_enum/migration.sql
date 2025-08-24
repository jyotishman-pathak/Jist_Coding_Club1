/*
  Warnings:

  - Added the required column `occuring` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Occuring" AS ENUM ('UPCOMMING', 'PAST', 'HACKTHONS');

-- AlterTable
ALTER TABLE "public"."Project" ADD COLUMN     "occuring" "public"."Occuring" NOT NULL;
