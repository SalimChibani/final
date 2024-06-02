/*
  Warnings:

  - You are about to drop the column `country` on the `exportinvoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `exportinvoice` DROP COLUMN `country`,
    ADD COLUMN `municipalite` ENUM('SAYADA_LAMTA_BOU_HAJAR', 'KSIBET_EL_MEDIOUNI', 'KSAR_HELAL', 'JEMMAL', 'SAHLINE', 'MONASTIR', 'MOKNINE', 'OUERDANINE', 'TEBOULBA', 'ZERAMDINE', 'BEKALTA', 'BEMBLA', 'BENI_HASSEN') NOT NULL DEFAULT 'MONASTIR',
    ALTER COLUMN `userId` DROP DEFAULT,
    ALTER COLUMN `productId` DROP DEFAULT;

-- CreateTable
CREATE TABLE `Resource` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `productId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Resource` ADD CONSTRAINT `Resource_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
