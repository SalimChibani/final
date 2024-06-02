-- AlterTable
ALTER TABLE `exportinvoice` ADD COLUMN `productId` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `ExportInvoice` ADD CONSTRAINT `ExportInvoice_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
