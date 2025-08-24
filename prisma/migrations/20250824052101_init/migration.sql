-- CreateTable
CREATE TABLE "public"."hackathons" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fees" TEXT NOT NULL,

    CONSTRAINT "hackathons_pkey" PRIMARY KEY ("id")
);
