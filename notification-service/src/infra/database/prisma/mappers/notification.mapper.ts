import { Notification as RawNotification } from "@prisma/client"
import { Notification } from "@application/entities/notification/notification"
import { Err, Ok, Result } from "ts-results"
import { Content } from "@application/entities/notification/content"
import { ValidationError } from "@errors/validation.error"

export class PrismaNotificationMapper {
    /**
     * Converts a Notification instance to a Notification database entity.
     */
    public static toPrisma(notification: Notification) {
        return {
            id: notification.get("id"),
            content: notification.get("content").value,
            category: notification.get("category"),
            recipientId: notification.get("recipientId"),
            readAt: notification.get("readAt").unwrapOr(null),
            createdAt: notification.get("createdAt").unwrapOr(new Date()),
            cancelledAt: notification.get("cancelledAt").unwrapOr(null)
        }
    }

    /**
    * Converts a Notification database entity to a Notification instance.
    */
    public static toDomain(raw: RawNotification): Result<Notification, ValidationError> {
        try {
            return Ok(Notification.create({
                id: raw.id,
                content: Content.create(raw.content).unwrap(),
                category: raw.category,
                recipientId: raw.recipientId,
                readAt: raw.readAt,
                createdAt: raw.createdAt,
                cancelledAt: raw.cancelledAt
            }).expect("Failed to convert database entity Notification to instance."))
        }
        catch(error) {
            return Err(error as ValidationError)
        }
    }
}
