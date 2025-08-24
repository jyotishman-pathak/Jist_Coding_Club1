-- CreateEnum
CREATE TYPE "public"."ProjectOccurence" AS ENUM ('ONGOING', 'COMPLETED');

-- CreateTable
CREATE TABLE "public"."Projects" (
    "id" SERIAL NOT NULL,
    "projectTitle" TEXT NOT NULL,
    "projectDescription" TEXT NOT NULL,
    "githubUrl" TEXT,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);
