-- CreateTable
CREATE TABLE "public"."Leaderboard" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "eventsCount" INTEGER NOT NULL DEFAULT 0,
    "quizScore" INTEGER NOT NULL DEFAULT 0,
    "commits" INTEGER NOT NULL DEFAULT 0,
    "badges" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Leaderboard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Leaderboard_userId_key" ON "public"."Leaderboard"("userId");

-- AddForeignKey
ALTER TABLE "public"."Leaderboard" ADD CONSTRAINT "Leaderboard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
