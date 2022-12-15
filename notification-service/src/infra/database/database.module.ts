import { Module } from "@nestjs/common";
import { SendNotification } from "@application/use-cases/send-notification";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaNotificationRepository } from "./prisma/repositories/notification.repository";
import { NotificationRepository } from "@application/repositories/notification.repository";

@Module({
    providers: [SendNotification, PrismaService, {
        provide: NotificationRepository,
        useClass: PrismaNotificationRepository 
    }],
    exports: [SendNotification, PrismaService, NotificationRepository]
})
export class DatabaseModule {}
