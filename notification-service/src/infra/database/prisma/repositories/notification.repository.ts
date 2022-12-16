import { Injectable } from "@nestjs/common"
import {
    Notification,
    NotificationProps,
} from "@application/entities/notification/notification"
import { Err, None, Ok, Option, Result, Some } from "ts-results"
import { NotificationRepository } from "@application/repositories/notification.repository"
import { PrismaService } from "../prisma.service"
import { PrismaNotificationMapper } from "../mappers/notification.mapper"

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
    constructor(private prisma: PrismaService) {}
    public async create(
        notification: Notification
    ): Promise<Result<void, Error>> {
        await this.prisma.notification.create({
            data: PrismaNotificationMapper.toPrisma(notification),
        })

        return Ok.EMPTY
    }

    public async findById(
        id: string
    ): Promise<Result<Option<Notification>, Error>> {
        try {
            const result = await this.prisma.notification.findUnique({
                where: { id },
            })

            if (result == null) return Ok(None)
            else
                return Ok(
                    Some(PrismaNotificationMapper.toDomain(result).unwrap())
                )
        } catch (error) {
            return Err(error as Error)
        }
    }

    public async countManyBy(
        options: Partial<NotificationProps>
    ): Promise<Result<number, Error>> {
        const {
            content,
            category,
            recipientId,
            createdAt,
            cancelledAt,
            readAt,
        } = options

        try {
            const count = await this.prisma.notification.count({
                where: {
                    content: content?.value,
                    category,
                    recipientId,
                    createdAt: createdAt?.some ? createdAt.unwrap() : undefined,
                    readAt: readAt?.some ? readAt.unwrap() : undefined,
                    cancelledAt: cancelledAt?.some
                        ? cancelledAt.unwrap()
                        : undefined,
                },
            })

            return Ok(count)
        } catch (error) {
            return Err(error as Error)
        }
    }

    public async findManyBy(
        options: Partial<NotificationProps>
    ): Promise<Result<Notification[], Error>> {
        const {
            content,
            category,
            recipientId,
            createdAt,
            cancelledAt,
            readAt,
        } = options

        try {
            const notifications = await this.prisma.notification.findMany({
                where: {
                    content: content?.value,
                    category,
                    recipientId,
                    createdAt: createdAt?.some ? createdAt.unwrap() : undefined,
                    readAt: readAt?.some ? readAt.unwrap() : undefined,
                    cancelledAt: cancelledAt?.some
                        ? cancelledAt.unwrap()
                        : undefined,
                },
            })

            return Ok(
                notifications.map(notification =>
                    PrismaNotificationMapper.toDomain(notification).unwrap()
                )
            )
        } catch (error) {
            return Err(error as Error)
        }
    }

    public async save(
        notification: Notification
    ): Promise<Result<void, Error>> {
        try {
            await this.prisma.notification.update({
                where: { id: notification.get("id") },
                data: {
                    id: notification.get("id"),
                    content: notification.get("content").value,
                    category: notification.get("category"),
                    recipientId: notification.get("recipientId"),
                    readAt: notification.get("readAt").unwrapOr(undefined),
                    cancelledAt: notification.get("cancelledAt").unwrapOr(undefined),
                    createdAt: notification.get("createdAt").unwrapOr(undefined),
                },
            })

            return Ok.EMPTY
        } catch (error) {
            return Err(error as Error)
        }
    }
}
