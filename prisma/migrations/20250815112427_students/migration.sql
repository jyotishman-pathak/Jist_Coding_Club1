-- CreateEnum
CREATE TYPE "public"."Department" AS ENUM ('PEIE', 'ETC', 'MECH', 'CIVIL', 'MATHS', 'PHYSICS', 'CHEMISTRY', 'IT');

-- CreateTable
CREATE TABLE "public"."students" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "Deptartment" "public"."Department" NOT NULL,
    "ProgramingExperience" INTEGER NOT NULL,
    "Interest" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_email_key" ON "public"."students"("email");
