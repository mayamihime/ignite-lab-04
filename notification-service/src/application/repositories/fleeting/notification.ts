import {
    Notification,
    NotificationProps,
} from "@application/entities/notification/notification"
import { Err, None, Ok, Option, Result, Some } from "ts-results"
import { NotificationRepository } from "../notification.repository"

export class FleetingNotificationRepository implements NotificationRepository {
    public notifications: Notification[]

    constructor() {
        this.notifications = []
    }

    public async create(
        notification: Notification
    ): Promise<Result<void, Error>> {
        this.notifications.push(notification)

        return Ok.EMPTY
    }

    public async save(
        notification: Notification
    ): Promise<Result<void, Error>> {
        if (this.notifications.indexOf(notification) > -1) return Ok.EMPTY
        else
            return Err(
                new Error(
                    "Notification couldn't be updated, as it doesn't exist."
                )
            )
    }

    public async findById(
        id: string
    ): Promise<Result<Option<Notification>, Error>> {
        const notification = this.notifications.find(
            item => item.get("id") == id
        )

        if (notification) return Ok(Some(notification))
        else return Ok(None)
    }

    public async countManyBy(
        options: Partial<NotificationProps>
    ): Promise<Result<number, Error>> {
        if (Object.keys(options).length == 0)
            return Err(new Error("At least one option is required."))

        const count = this.notifications.filter(notification => {
            return Object.keys(options).some(
                key =>
                    notification.get(key as keyof NotificationProps) ==
                    options[key]
            )
            //  return Object.keys(options).some(key => notification.get(key) == options[key])
        }).length

        return Ok(count)
    }

    public async findManyBy(
        options: Partial<NotificationProps>
    ): Promise<Result<Notification[], Error>> {
        if (Object.keys(options).length == 0)
            return Err(new Error("At least one option is required."))

        const notifications = this.notifications.filter(notification => {
            return Object.keys(options).some(
                key => notification.get(key as keyof NotificationProps) == options[key]
            )
        })

        return Ok(notifications)
    }
}
