/*
  Warnings:

  - You are about to drop the column `title` on the `tb_sejarah` table. All the data in the column will be lost.
  - Added the required column `name` to the `tb_sejarah` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tb_sejarah` DROP COLUMN `title`,
    ADD COLUMN `name` VARCHAR(255) NOT NULL;
