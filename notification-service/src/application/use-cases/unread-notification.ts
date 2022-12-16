import { Injectable, Logger } from "@nestjs/common"
import { Err, Ok, Result } from "ts-results"
import { NotificationRepository } from "@application/repositories/notification.repository"
import { NotFoundError } from "@errors/not-found.error"

export interface UnreadNotificationRequest {
    id: string
}

@Injectable()
export class UnreadNotification {
    private static logger = new Logger(UnreadNotification.name)
    constructor(private notificationRepository: NotificationRepository) {}

    // todo: change error to be more specific
    async execute(
        request: UnreadNotificationRequest
    ): Promise<Result<void, NotFoundError | Error>> {
        const { id } = request

        try {
            const notification = (
                await this.notificationRepository.findById(id)
            ).unwrap()

            if (notification.none)
                return Err(new NotFoundError("Notification not found."))
            else notification.val.unread()

            const result = await this.notificationRepository.save(
                notification.unwrap()
            )

            if (result.ok) return Ok.EMPTY
            else return Err(result.val)

        } catch (error) {
            UnreadNotification.logger.error(`Failed to execute(): ${error}`)
            return Err(error as Error)
        }
    }
}
