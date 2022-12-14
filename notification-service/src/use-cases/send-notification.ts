import { Injectable } from "@nestjs/common";
import { PrismaNotificationRepository } from "src/infra/database/prisma/repositories/notification.repository";
import { Err, Ok, Result } from "ts-results";
import { Content } from "../entities/notification/content";
import { Notification } from "../entities/notification/notification";

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
    constructor(private notificationRepository: PrismaNotificationRepository) {}

    async execute(request: SendNotificationRequest): Promise<Result<SendNotificationResponse, Error>> {
        const { content, recipientId, category } = request

        const notification = Notification.create({
            content: Content.create(content).unwrap(), // should be properly handled later
            category,
            recipientId
        })

        const result = await this.notificationRepository.create(notification)

        if (result.ok) return Ok({
            notification
        })
        else return Err(result.val)
    }
}
