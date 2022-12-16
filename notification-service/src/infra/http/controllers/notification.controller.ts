import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Logger,
    Param,
    Patch,
    Post,
} from "@nestjs/common"
import { SendNotification } from "@application/use-cases/send-notification"
import { CreateNotificationData } from "../dtos/create-notification.data"
import { NotificationViewModel } from "../view-models/notification"
import { CancelNotification } from "@application/use-cases/cancel-notification"
import { CountRecipientNotifications } from "@application/use-cases/count-recipient-notifications"
import { FetchRecipientNotifications } from "@application/use-cases/fetch-recipient-notifications"
import { ReadNotification } from "@application/use-cases/read-notification"
import { UnreadNotification } from "@application/use-cases/unread-notification"

// todo: implement proper error handling instead of throwing 500
@Controller("notifications")
export class NotificationController {
    private logger = new Logger(NotificationController.name)

    constructor(
        private sendNotification: SendNotification,
        private readNotification: ReadNotification,
        private unreadNotification: UnreadNotification,
        private cancelNotification: CancelNotification,
        private countRecipientNotification: CountRecipientNotifications,
        private fetchRecipientNotifications: FetchRecipientNotifications
    ) {}

    @Post()
    async create(@Body() createNotificationData: CreateNotificationData) {
        const { recipientId, content, category } = createNotificationData

        const result = await this.sendNotification.execute({
            content,
            category,
            recipientId,
        })

        if (result.ok) {
            return {
                notification: NotificationViewModel.view(
                    result.val.notification
                ),
            }
        } else {
            this.logger.error(
                `Failed to create notification: ${result.val.name} - ${result.val.message}`,
                result.val.stack
            )
            throw new InternalServerErrorException()
        }
    }

    @Patch("/:id/cancel")
    public async cancel(@Param("id") id: string) {
        const result = await this.cancelNotification.execute({
            id,
        })

        if (result.err) {
            this.logger.error(`Failed to cancel notification: ${result.val}`)
            throw new InternalServerErrorException(
                "Failed to cancel notification."
            )
        }
    }

    @Get("/:recipientId/count")
    public async countByRecipient(@Param("recipientId") recipientId: string) {
        const result = await this.countRecipientNotification.execute({
            recipientId,
        })

        if (result.ok) return result.val
        else {
            this.logger.error(`Failed to count notifications: ${result.val}`)
            throw new InternalServerErrorException(
                "Failed to count notifications."
            )
        }
    }

    @Get("/:recipientId/fetch")
    public async fetchByRecipient(@Param("recipientId") recipientId: string) {
        const result = await this.fetchRecipientNotifications.execute({
            recipientId,
        })

        if (result.ok) return result.val
        else this.logger.error(`Failed to fetch notifications: ${result.val}`)
        throw new InternalServerErrorException(
            "Failed to fetch notifications by recipient."
        )
    }

    @Patch("/:id/read")
    public async read(@Param("id") id: string) {
        const result = await this.readNotification.execute({ id })

        if (result.err) {
            this.logger.error(
                `Failed to mark notification as read: ${result.val}`
            )
            throw new InternalServerErrorException(
                "Failed to mark notification as read."
            )
        }
    }

    @Patch("/:id/unread")
    public async unread(@Param("id") id: string) {
        const result = await this.unreadNotification.execute({ id })

        if (result.err) {
            this.logger.error(
                `Failed to mark notification as unread: ${result.val}`
            )
            throw new InternalServerErrorException(
                "Failed  to mark notification as unread."
            )
        }
    }
}
