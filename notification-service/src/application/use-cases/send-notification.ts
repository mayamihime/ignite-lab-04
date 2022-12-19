import { Injectable, Logger } from "@nestjs/common"
import { Err, Ok, Result } from "ts-results"
import { Content } from "../entities/notification/content"
import { Notification } from "../entities/notification/notification"
import { NotificationRepository } from "@application/repositories/notification.repository"
import { NotFoundError } from "@errors/not-found.error"

export interface SendNotificationRequest {
    content: string
    category: string
    recipientId: string
}

interface SendNotificationResponse {
    notification: Notification
}

@Injectable()
export class SendNotification {
    private static logger = new Logger(SendNotification.name)

    constructor(private notificationRepository: NotificationRepository) {}

    async execute(
        request: SendNotificationRequest
    ): Promise<Result<SendNotificationResponse, NotFoundError | Error>> {
        const { content, recipientId, category } = request

        try {
            const notification = Notification.create({
                content: Content.create(content).unwrap(),
                category,
                recipientId,
            }).unwrap()

            const result = await this.notificationRepository.create(
                notification
            )

            if (result.ok)
                return Ok({
                    notification,
                })
            else return Err(result.val)
        } catch (error) {
            SendNotification.logger.error(`Failed to execute() sendNotification: ${error}`)
            return Err(error as Error)
        }
    }
}
