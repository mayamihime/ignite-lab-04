import { Notification, NotificationProps } from "../entities/notification/notification"
import { Result, Option } from "ts-results"
import { DatabaseError } from "@errors/database.error"

export abstract class NotificationRepository {
    abstract create(notification: Notification): Promise<Result<void, DatabaseError>>
    abstract findById(id: string): Promise<Result<Option<Notification>, DatabaseError>>
    abstract save(notification: Notification): Promise<Result<void, DatabaseError>>
    abstract countManyBy(options: Partial<NotificationProps>): Promise<Result<number, DatabaseError>>
    abstract findManyBy(options: Partial<NotificationProps>): Promise<Result<Notification[], DatabaseError>>
}
