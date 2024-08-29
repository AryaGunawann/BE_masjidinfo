-- CreateTable
CREATE TABLE `tb_users` (
    `id` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `avatar` VARCHAR(255) NULL,
    `is_verified` BOOLEAN NOT NULL DEFAULT false,
    `is_email_verification` BOOLEAN NOT NULL DEFAULT false,
    `role` ENUM('USER', 'ADMIN', 'AUTHOR') NOT NULL DEFAULT 'USER',
    `reset_password_token` VARCHAR(255) NULL,
    `reset_password_expiration` DATETIME(3) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `tb_users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_discussions` (
    `id` VARCHAR(255) NOT NULL,
    `message` VARCHAR(5000) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `id_replies_discussion` VARCHAR(255) NULL,
    `id_user` VARCHAR(255) NOT NULL,
    `id_detail_masjid` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_masjids` (
    `id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `thumbnail` TEXT NULL,
    `totalKliks` INTEGER NOT NULL DEFAULT 0,
    `created_by` VARCHAR(255) NOT NULL,
    `updated_by` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_detail_masjids` (
    `id` VARCHAR(255) NOT NULL,
    `id_masjid` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `address` TEXT NOT NULL,
    `totalKliks` INTEGER NOT NULL DEFAULT 0,
    `created_by` VARCHAR(255) NOT NULL,
    `updated_by` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_sejarah` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `masjidId` VARCHAR(255) NOT NULL,
    `detailMasjidId` VARCHAR(255) NULL,
    `created_by` VARCHAR(255) NOT NULL,
    `updated_by` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_photos` (
    `id` VARCHAR(255) NOT NULL,
    `photo_url` VARCHAR(255) NOT NULL,
    `caption` TEXT NULL,
    `masjidId` VARCHAR(255) NULL,
    `detailMasjidId` VARCHAR(255) NULL,
    `created_by` VARCHAR(255) NOT NULL,
    `updated_by` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_categories` (
    `id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `created_by` VARCHAR(255) NOT NULL,
    `updated_by` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_masjid_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `masjidId` VARCHAR(255) NOT NULL,
    `id_category` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_histories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `action` VARCHAR(255) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `masjidId` VARCHAR(255) NULL,
    `detailMasjidId` VARCHAR(255) NULL,
    `userId` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_discussions` ADD CONSTRAINT `tb_discussions_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `tb_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_discussions` ADD CONSTRAINT `tb_discussions_id_detail_masjid_fkey` FOREIGN KEY (`id_detail_masjid`) REFERENCES `tb_detail_masjids`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_discussions` ADD CONSTRAINT `tb_discussions_id_replies_discussion_fkey` FOREIGN KEY (`id_replies_discussion`) REFERENCES `tb_discussions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_masjids` ADD CONSTRAINT `tb_masjids_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `tb_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_masjids` ADD CONSTRAINT `tb_masjids_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `tb_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_detail_masjids` ADD CONSTRAINT `tb_detail_masjids_id_masjid_fkey` FOREIGN KEY (`id_masjid`) REFERENCES `tb_masjids`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_detail_masjids` ADD CONSTRAINT `tb_detail_masjids_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `tb_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_detail_masjids` ADD CONSTRAINT `tb_detail_masjids_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `tb_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_sejarah` ADD CONSTRAINT `tb_sejarah_detailMasjidId_fkey` FOREIGN KEY (`detailMasjidId`) REFERENCES `tb_detail_masjids`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_photos` ADD CONSTRAINT `tb_photos_detailMasjidId_fkey` FOREIGN KEY (`detailMasjidId`) REFERENCES `tb_detail_masjids`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_categories` ADD CONSTRAINT `tb_categories_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `tb_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_categories` ADD CONSTRAINT `tb_categories_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `tb_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_masjid_category` ADD CONSTRAINT `tb_masjid_category_masjidId_fkey` FOREIGN KEY (`masjidId`) REFERENCES `tb_masjids`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_masjid_category` ADD CONSTRAINT `tb_masjid_category_id_category_fkey` FOREIGN KEY (`id_category`) REFERENCES `tb_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_histories` ADD CONSTRAINT `tb_histories_detailMasjidId_fkey` FOREIGN KEY (`detailMasjidId`) REFERENCES `tb_detail_masjids`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_histories` ADD CONSTRAINT `tb_histories_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tb_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
