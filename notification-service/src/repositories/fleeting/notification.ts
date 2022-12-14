import { Notification } from 'src/entities/notification/notification'
import { Ok, Result } from 'ts-results'
import { NotificationRepository } from '../notification.repository'

export class FleetingNotificationRepository implements NotificationRepository {
    constructor(public notifications: Notification[] = []) {}

    public async create(notification: Notification): Promise<Result<void, Error>> {
        this.notifications.push(notification) 

        return Ok.EMPTY
    }
}
