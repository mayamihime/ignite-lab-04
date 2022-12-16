import { Notification, NotificationProps } from '@application/entities/notification/notification'
import { Err, None, Ok, Option, Result, Some } from 'ts-results'
import { NotificationRepository } from '../notification.repository'

export class FleetingNotificationRepository implements NotificationRepository {
    constructor(public notifications: Notification[] = []) {}

    public async create(notification: Notification): Promise<Result<void, Error>> {
        this.notifications.push(notification) 

        return Ok.EMPTY
    }

    public async save(): Promise<Result<void, Error>> {
        return Ok.EMPTY
    }

    public async findById(id: string): Promise<Result<Option<Notification>, Error>> {
        const notification = this.notifications.find(item => item.get("id") === id)

        if (notification) return Ok(Some(notification))
        else return Ok(None)
    }

    public async countManyBy(options: Partial<NotificationProps>): Promise<Result<number, Error>> {
        if (Object.keys(options).length == 0) return Err(new Error("At least one option is required.")) 

        const count = this.notifications.filter(notification => {
            return Object.keys(options).some(key => notification[key] == options[key])
        }).length

        return Ok(count)
    }

    public async findManyBy(options: Partial<NotificationProps>): Promise<Result<Notification[], Error>> {
        if (Object.keys(options).length == 0) return Err(new Error("At least one option is required.")) 

        const notifications = this.notifications.filter(notification => {
            return Object.keys(options).some(key => notification[key] == options[key])
        })

        return Ok(notifications)
    }
}
