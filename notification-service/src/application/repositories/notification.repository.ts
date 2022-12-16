import { Notification, NotificationProps } from "../entities/notification/notification"
import { Result, Option } from "ts-results"

export abstract class NotificationRepository {
    // change to non-generic Errors
    abstract create(notification: Notification): Promise<Result<void, Error>>
    abstract findById(id: string): Promise<Result<Option<Notification>, Error>>
    abstract save(notification: Notification): Promise<Result<void, Error>>
    abstract countManyBy(options: Partial<NotificationProps>): Promise<Result<number, Error>>
    abstract findManyBy(options: Partial<NotificationProps>): Promise<Result<Notification[], Error>>
}
