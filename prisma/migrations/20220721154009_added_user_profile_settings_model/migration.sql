-- CreateTable
CREATE TABLE "user_profile_settings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "language" VARCHAR(3) NOT NULL,
    "currency" VARCHAR(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_profile_settings_pkey" PRIMARY KEY ("id")
);
