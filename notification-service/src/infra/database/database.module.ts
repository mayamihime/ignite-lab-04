import { Module } from "@nestjs/common";
import { SendNotification } from "src/use-cases/send-notification";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaNotificationRepository } from "./prisma/repositories/notification.repository";

@Module({
    providers: [SendNotification, PrismaService, PrismaNotificationRepository],
    exports: [SendNotification, PrismaService, PrismaNotificationRepository]
})
export class DatabaseModule {}
