import { Module } from "@nestjs/common";
import { SendNotification } from "@application/use-cases/send-notification";
import { DatabaseModule } from "../database/database.module";
import { NotificationController } from "./controllers/notification.controller";
import { NotificationRepository } from "@application/repositories/notification.repository";
import { PrismaNotificationRepository } from "@infra/database/prisma/repositories/notification.repository";

@Module({
    imports: [DatabaseModule],
    providers: [SendNotification, PrismaNotificationRepository],
    controllers: [NotificationController]
})
export class HttpModule {}
