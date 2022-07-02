-- AlterTable
ALTER TABLE "credit_card_issuers" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "credit_card_items" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "credit_cards" ADD COLUMN     "deletedAt" TIMESTAMP(3);
