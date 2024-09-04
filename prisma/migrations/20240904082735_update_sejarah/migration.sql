-- AlterTable
ALTER TABLE `tb_photos` MODIFY `photo_url` TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE `tb_sejarah` ADD CONSTRAINT `tb_sejarah_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `tb_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_sejarah` ADD CONSTRAINT `tb_sejarah_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `tb_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
