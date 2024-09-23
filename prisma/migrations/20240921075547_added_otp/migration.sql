-- AlterTable
ALTER TABLE `tb_users` ADD COLUMN `otp_attempts` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `otp_expiration` DATETIME(3) NULL,
    ADD COLUMN `otp_hash` VARCHAR(255) NULL,
    ADD COLUMN `otp_last_attempt` DATETIME(3) NULL;
