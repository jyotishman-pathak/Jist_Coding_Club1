/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `AdditionalInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AdditionalInfo_email_key" ON "public"."AdditionalInfo"("email");
