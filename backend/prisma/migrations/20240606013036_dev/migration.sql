/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productIdentifier]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `country` to the `ExportInvoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transport` to the `ExportInvoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `exportinvoice` ADD COLUMN `country` ENUM('Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'SouthKorea', 'RepublicoftheCongo', 'Romania', 'Russia', 'SaudiArabia', 'Senegal', 'Serbia', 'Slovakia', 'Slovenia', 'SouthAfrica', 'SouthSudan', 'Spain', 'Sudan', 'Sweden', 'Switzerland', 'Syria', 'Tunisia', 'Turkey', 'Uganda', 'Ukraine', 'UnitedArabEmirates', 'UnitedKingdom', 'Uruguay') NOT NULL,
    ADD COLUMN `exportImage` VARCHAR(191) NULL,
    ADD COLUMN `transport` ENUM('poste', 'air', 'tair') NOT NULL,
    ALTER COLUMN `municipalite` DROP DEFAULT;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `resetPasswordExpires` DATETIME(3) NULL,
    ADD COLUMN `resetPasswordToken` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `userinfo` ADD COLUMN `spec` ENUM('transiteur', 'transporteur', 'societe_de_commerce') NULL,
    ADD COLUMN `userImage` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Product_name_key` ON `Product`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Product_productIdentifier_key` ON `Product`(`productIdentifier`);
