/*
  Warnings:

  - You are about to drop the column `badges` on the `Leaderboard` table. All the data in the column will be lost.
  - You are about to drop the column `eventsCount` on the `Leaderboard` table. All the data in the column will be lost.
  - You are about to drop the column `points` on the `Leaderboard` table. All the data in the column will be lost.
  - You are about to drop the column `quizScore` on the `Leaderboard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Leaderboard" DROP COLUMN "badges",
DROP COLUMN "eventsCount",
DROP COLUMN "points",
DROP COLUMN "quizScore",
ADD COLUMN     "hackathon" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "quiz" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalPoints" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "workshop" INTEGER NOT NULL DEFAULT 0;
