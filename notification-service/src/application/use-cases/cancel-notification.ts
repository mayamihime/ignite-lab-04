import { Injectable, Logger } from "@nestjs/common"
import { Err, Ok, Result } from "ts-results"
import { NotificationRepository } from "@application/repositories/notification.repository"
import { NotFoundError } from "@errors/not-found.error"

export interface CancelNotificationRequest {
    id: string
}

@Injectable()
export class CancelNotification {
    private static logger = new Logger(CancelNotification.name)
    constructor(private notificationRepository: NotificationRepository) {}

    async execute(
        request: CancelNotificationRequest
    ): Promise<Result<void, NotFoundError | Error>> {
        const { id } = request

        try {
            const notification = (
                await this.notificationRepository.findById(id)
            ).unwrap()

            if (notification.none)
                return Err(new NotFoundError("Notification not found."))
            else notification.val.cancel()

            const result = await this.notificationRepository.save(
                notification.unwrap()
            )
            
            if (result.ok) return Ok.EMPTY
            else return Err(result.val)
        } catch (error) {
            CancelNotification.logger.error(`Failed to execute(): ${error}`)
            return Err(error as Error)
        }
    }
}
