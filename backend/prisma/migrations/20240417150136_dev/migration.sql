-- AlterTable
ALTER TABLE `exportinvoice` ADD COLUMN `userId` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `ExportInvoice` ADD CONSTRAINT `ExportInvoice_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
