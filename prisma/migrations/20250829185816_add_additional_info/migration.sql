-- CreateTable
CREATE TABLE "public"."AdditionalInfo" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "githubUrl" TEXT,
    "linkedIn" TEXT,
    "instagram" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdditionalInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdditionalInfo_userId_key" ON "public"."AdditionalInfo"("userId");

-- AddForeignKey
ALTER TABLE "public"."AdditionalInfo" ADD CONSTRAINT "AdditionalInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
