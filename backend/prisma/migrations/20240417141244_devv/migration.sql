/*
  Warnings:

  - You are about to drop the column `description` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `userinfo` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `userinfo` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `userinfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `description`,
    DROP COLUMN `price`,
    ADD COLUMN `productId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `userinfo` DROP COLUMN `age`,
    DROP COLUMN `lastname`,
    DROP COLUMN `name`,
    ADD COLUMN `activity` VARCHAR(191) NULL,
    ADD COLUMN `agentName` VARCHAR(191) NULL,
    ADD COLUMN `commercialId` VARCHAR(191) NULL,
    ADD COLUMN `diwanaId` VARCHAR(191) NULL,
    ADD COLUMN `exportType` ENUM('Owned', 'Rent') NOT NULL DEFAULT 'Owned',
    ADD COLUMN `fax` VARCHAR(191) NULL,
    ADD COLUMN `legalForm` VARCHAR(191) NULL,
    ADD COLUMN `localType` ENUM('Full', 'Partial') NOT NULL DEFAULT 'Full',
    ADD COLUMN `numberOfAdmin` INTEGER NULL,
    ADD COLUMN `numberOfWorker` INTEGER NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NULL,
    ADD COLUMN `societeLocation` VARCHAR(191) NULL,
    ADD COLUMN `societeName` VARCHAR(191) NULL,
    ADD COLUMN `storageLocation` VARCHAR(191) NULL,
    ADD COLUMN `taxId` VARCHAR(191) NULL,
    ADD COLUMN `workshopLocation` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExportInvoice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `location` VARCHAR(191) NOT NULL,
    `products` VARCHAR(191) NOT NULL,
    `exporter` VARCHAR(191) NOT NULL,
    `numFact` VARCHAR(191) NOT NULL,
    `societe` VARCHAR(191) NOT NULL,
    `societelocation` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `quantity` VARCHAR(191) NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `factDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `categoryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ExportInvoice` ADD CONSTRAINT `ExportInvoice_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
