/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `credit_card_issuers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "credit_card_issuers_name_key" ON "credit_card_issuers"("name");
