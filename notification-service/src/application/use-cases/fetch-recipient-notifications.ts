import { Notification, NotificationData } from "@application/entities/notification/notification"
import { NotificationRepository } from "@application/repositories/notification.repository"
import { Injectable, Logger } from "@nestjs/common"
import { Err, Ok, Result } from "ts-results"

export interface FetchRecipientNotificationsRequest {
    recipientId: string
}

export interface FetchRecipientNotificationsResponse {
    notifications: NotificationData[]
}

@Injectable()
export class FetchRecipientNotifications {
    private static logger = new Logger(FetchRecipientNotifications.name)
    constructor(private notificationRepository: NotificationRepository) {}

    public async execute(
        request: FetchRecipientNotificationsRequest
    ): Promise<Result<FetchRecipientNotificationsResponse, Error>> {
        const { recipientId } = request

        try {
            const notifications = (await this.notificationRepository.findManyBy({
                recipientId,
            })).unwrap()

            return Ok({
                notifications: notifications.map(notification => notification.toData())
            })
        } catch (error) {
            FetchRecipientNotifications.logger.error(`Failed to execute(): ${error}`)
            return Err(error as Error)
        }
    }
}
