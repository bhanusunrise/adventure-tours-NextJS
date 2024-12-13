-- AddForeignKey
ALTER TABLE `Package_Locations` ADD CONSTRAINT `Package_Locations_package_id_fkey` FOREIGN KEY (`package_id`) REFERENCES `Packages`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Package_Activities` ADD CONSTRAINT `Package_Activities_package_id_fkey` FOREIGN KEY (`package_id`) REFERENCES `Packages`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
