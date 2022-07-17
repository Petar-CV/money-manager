/*
  Warnings:

  - The `billingDate` column on the `credit_cards` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "credit_cards" DROP COLUMN "billingDate",
ADD COLUMN     "billingDate" INTEGER NOT NULL DEFAULT 1;
