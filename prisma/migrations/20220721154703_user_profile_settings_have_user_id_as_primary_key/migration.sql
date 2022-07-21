/*
  Warnings:

  - The primary key for the `user_profile_settings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user_profile_settings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `user_profile_settings` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user_profile_settings" DROP CONSTRAINT "user_profile_settings_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_settings_userId_key" ON "user_profile_settings"("userId");
