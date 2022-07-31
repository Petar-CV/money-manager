-- CreateEnum
CREATE TYPE "CreditCardLimit" AS ENUM ('MONTHLY', 'OVERALL');

-- AlterTable
ALTER TABLE "credit_cards" ADD COLUMN     "limitType" "CreditCardLimit" NOT NULL DEFAULT 'OVERALL';
