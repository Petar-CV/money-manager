-- AlterTable
ALTER TABLE "exceptions" ALTER COLUMN "message" DROP NOT NULL,
ALTER COLUMN "params" DROP NOT NULL,
ALTER COLUMN "query" DROP NOT NULL;
