/*
  Warnings:

  - You are about to drop the column `totalKliks` on the `tb_masjids` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tb_detail_masjids` ADD COLUMN `total_klik` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `tb_masjids` DROP COLUMN `totalKliks`;
