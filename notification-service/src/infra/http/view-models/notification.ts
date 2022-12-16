import { Notification } from "@application/entities/notification/notification"

export class NotificationViewModel {
    public static view(notification: Notification) {
        return {
            id: notification.get("id"),
            content: notification.get("content").value,
            category: notification.get("category"),
            recipientId: notification.get("recipientId"),
        }
    }
}
