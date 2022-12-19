import { NotificationRepository } from "@application/repositories/notification.repository";
import { NotFoundError } from "@errors/not-found.error";
import { Injectable, Logger } from "@nestjs/common";
import { Err, Ok, Result } from "ts-results";

export interface CountRecipientNotificationsRequest {
    recipientId: string
}

export interface CountRecipientNotificationsResponse {
    count: number
}

@Injectable()
export class CountRecipientNotifications {
    private static logger = new Logger(CountRecipientNotifications.name)

    constructor(private notificationRepository: NotificationRepository) {}

    public async execute(request: CountRecipientNotificationsRequest): Promise<Result<CountRecipientNotificationsResponse, NotFoundError | Error>> {
        const { recipientId } = request
        
        try {
            const result = await this.notificationRepository.countManyBy({
                recipientId
            })

            return Ok({
                count: result.unwrap()
            })

        } catch (error) {
            CountRecipientNotifications.logger.error(`Failed to execute(): ${error}`)
            return Err(error as Error)
        }
    }
}
