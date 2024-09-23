/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `tb_detail_masjids` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `tb_detail_masjids` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tb_detail_masjids` ADD COLUMN `slug` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `tb_detail_masjids_slug_key` ON `tb_detail_masjids`(`slug`);
