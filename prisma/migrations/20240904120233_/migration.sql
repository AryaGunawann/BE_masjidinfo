/*
  Warnings:

  - You are about to drop the column `masjidId` on the `tb_photos` table. All the data in the column will be lost.
  - The primary key for the `tb_sejarah` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `tb_photos` DROP COLUMN `masjidId`;

-- AlterTable
ALTER TABLE `tb_sejarah` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`id`);
