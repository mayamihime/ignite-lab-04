import { Injectable, Logger } from "@nestjs/common"
import { Err, Ok, Result } from "ts-results"
import { NotificationRepository } from "@application/repositories/notification.repository"
import { NotFoundError } from "@errors/not-found.error"

export interface ReadNotificationRequest {
    id: string
}

@Injectable()
export class ReadNotification {
    private static logger = new Logger(ReadNotification.name)
    constructor(private notificationRepository: NotificationRepository) {}

    async execute(
        request: ReadNotificationRequest
    ): Promise<Result<void, NotFoundError | Error>> {
        const { id } = request

        try {
            const notification = (
                await this.notificationRepository.findById(id)
            ).unwrap()

            if (notification.none)
                return Err(new NotFoundError("Notification not found."))
            else notification.unwrap().read()

            const result = await this.notificationRepository.save(
                notification.unwrap()
            )

            if (result.ok) return Ok.EMPTY
            else return Err(result.val)
        } catch (error) {
            ReadNotification.logger.error(`Failed to execute(): ${error}`)
            return Err(error as Error)
        }
    }
}
