import { Module } from "@nestjs/common"
import { SendNotification } from "@application/use-cases/send-notification"
import { DatabaseModule } from "../database/database.module"
import { NotificationController } from "./controllers/notification.controller"
import { PrismaNotificationRepository } from "@infra/database/prisma/repositories/notification.repository"
import { CancelNotification } from "@application/use-cases/cancel-notification"
import { CountRecipientNotifications } from "@application/use-cases/count-recipient-notifications"
import { FetchRecipientNotifications } from "@application/use-cases/fetch-recipient-notifications"
import { ReadNotification } from "@application/use-cases/read-notification"
import { UnreadNotification } from "@application/use-cases/unread-notification"

@Module({
    imports: [DatabaseModule],
    providers: [
        PrismaNotificationRepository,
        SendNotification,
        CancelNotification,
        CountRecipientNotifications,
        FetchRecipientNotifications,
        ReadNotification,
        UnreadNotification,
    ],
    controllers: [NotificationController],
})
export class HttpModule {}
