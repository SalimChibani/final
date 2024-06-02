/*
  Warnings:

  - You are about to drop the column `productId` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `productId`,
    ADD COLUMN `productIdentifier` VARCHAR(191) NULL;
