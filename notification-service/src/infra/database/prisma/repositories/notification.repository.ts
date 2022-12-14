import { Injectable } from "@nestjs/common";
import { Notification } from "src/entities/notification/notification";
import { Ok, Result } from "ts-results";
import { NotificationRepository } from "../../../../repositories/notification.repository"
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository { 
    constructor(private prismaService: PrismaService) {}
    public async create(notification: Notification): Promise<Result<void, Error>> {
        const { id, content, category, recipientId, readAt, createdAt } = notification

        await this.prismaService.notification.create({
            data: {
                id,
                content: content.value,
                category,
                recipientId,
                readAt,
                createdAt
            }
        })

        return Ok.EMPTY
    }      
}
