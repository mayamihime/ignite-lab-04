import { Module } from "@nestjs/common";
import { SendNotification } from "src/use-cases/send-notification";
import { DatabaseModule } from "../database/database.module";
import { PrismaNotificationRepository } from "../database/prisma/repositories/notification.repository";
import { NotificationController } from "./controllers/notification.controller";

@Module({
    imports: [DatabaseModule],
    providers: [SendNotification, PrismaNotificationRepository],
    controllers: [NotificationController]
})
export class HttpModule {}
