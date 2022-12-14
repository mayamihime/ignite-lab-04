import { Notification } from "../entities/notification/notification";
import { Result } from "ts-results";

export abstract class NotificationRepository {
    public abstract create(notification: Notification): Promise<Result<void, Error>>;
}
