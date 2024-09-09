/*
  Warnings:

  - The primary key for the `tb_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `tb_categories` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - You are about to drop the column `totalKliks` on the `tb_detail_masjids` table. All the data in the column will be lost.
  - You are about to drop the column `action` on the `tb_histories` table. All the data in the column will be lost.
  - You are about to drop the column `detailMasjidId` on the `tb_histories` table. All the data in the column will be lost.
  - You are about to drop the column `masjidId` on the `tb_histories` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `tb_histories` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `tb_histories` table. All the data in the column will be lost.
  - The primary key for the `tb_masjid_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `masjidId` on the `tb_masjid_categories` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `tb_masjid_categories` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - You are about to alter the column `id_category` on the `tb_masjid_categories` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - The primary key for the `tb_photos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `tb_photos` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - The primary key for the `tb_sejarah` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `tb_sejarah` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - A unique constraint covering the columns `[name]` on the table `tb_categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_detail_masjid` to the `tb_histories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `tb_histories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `tb_histories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_masjid` to the `tb_masjid_categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tb_histories` DROP FOREIGN KEY `tb_histories_detailMasjidId_fkey`;

-- DropForeignKey
ALTER TABLE `tb_histories` DROP FOREIGN KEY `tb_histories_userId_fkey`;

-- DropForeignKey
ALTER TABLE `tb_masjid_categories` DROP FOREIGN KEY `tb_masjid_categories_id_category_fkey`;

-- DropForeignKey
ALTER TABLE `tb_masjid_categories` DROP FOREIGN KEY `tb_masjid_categories_masjidId_fkey`;

-- AlterTable
ALTER TABLE `tb_categories` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `tb_detail_masjids` DROP COLUMN `totalKliks`;

-- AlterTable
ALTER TABLE `tb_histories` DROP COLUMN `action`,
    DROP COLUMN `detailMasjidId`,
    DROP COLUMN `masjidId`,
    DROP COLUMN `timestamp`,
    DROP COLUMN `userId`,
    ADD COLUMN `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `id_detail_masjid` VARCHAR(255) NOT NULL,
    ADD COLUMN `id_user` VARCHAR(255) NOT NULL,
    ADD COLUMN `message` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `tb_masjid_categories` DROP PRIMARY KEY,
    DROP COLUMN `masjidId`,
    ADD COLUMN `id_masjid` VARCHAR(255) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_category` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `tb_photos` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `tb_sejarah` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `tb_categories_name_key` ON `tb_categories`(`name`);

-- AddForeignKey
ALTER TABLE `tb_masjid_categories` ADD CONSTRAINT `tb_masjid_categories_id_masjid_fkey` FOREIGN KEY (`id_masjid`) REFERENCES `tb_masjids`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_masjid_categories` ADD CONSTRAINT `tb_masjid_categories_id_category_fkey` FOREIGN KEY (`id_category`) REFERENCES `tb_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_histories` ADD CONSTRAINT `tb_histories_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `tb_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_histories` ADD CONSTRAINT `tb_histories_id_detail_masjid_fkey` FOREIGN KEY (`id_detail_masjid`) REFERENCES `tb_detail_masjids`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
