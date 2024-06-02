/*
  Warnings:

  - You are about to drop the `resource` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `resource` DROP FOREIGN KEY `Resource_productId_fkey`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `productImage` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `resource`;
