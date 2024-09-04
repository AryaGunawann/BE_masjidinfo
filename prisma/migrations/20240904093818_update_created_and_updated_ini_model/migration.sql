/*
  Warnings:

  - You are about to drop the `tb_masjid_category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tb_masjid_category` DROP FOREIGN KEY `tb_masjid_category_id_category_fkey`;

-- DropForeignKey
ALTER TABLE `tb_masjid_category` DROP FOREIGN KEY `tb_masjid_category_masjidId_fkey`;

-- DropTable
DROP TABLE `tb_masjid_category`;

-- CreateTable
CREATE TABLE `tb_masjid_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `masjidId` VARCHAR(255) NOT NULL,
    `id_category` VARCHAR(255) NOT NULL,
    `created_by` VARCHAR(255) NOT NULL,
    `updated_by` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_photos` ADD CONSTRAINT `tb_photos_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `tb_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_photos` ADD CONSTRAINT `tb_photos_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `tb_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_masjid_categories` ADD CONSTRAINT `tb_masjid_categories_masjidId_fkey` FOREIGN KEY (`masjidId`) REFERENCES `tb_masjids`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_masjid_categories` ADD CONSTRAINT `tb_masjid_categories_id_category_fkey` FOREIGN KEY (`id_category`) REFERENCES `tb_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_masjid_categories` ADD CONSTRAINT `tb_masjid_categories_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `tb_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_masjid_categories` ADD CONSTRAINT `tb_masjid_categories_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `tb_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
