import { Content } from "../../application/entities/notification/content"
import { Notification } from "@application/entities/notification/notification"
import { FleetingNotificationRepository } from "@application/repositories/fleeting/notification"
import { CancelNotification } from "./cancel-notification"

describe("cancel notification", () => {
    const notificationRepository = new FleetingNotificationRepository()

    it("should be able to execute", async () => {
        const notification = Notification.create({
            content: Content.create("This should be cancelled.").unwrap(),
            category: "test",
            recipientId: "aSdtIG91dCBvZiBpZGVhcwo="
        })

        notificationRepository.create(notification)

        const result = await new CancelNotification(notificationRepository)
            .execute({ id: notification.id })

        // Fails if:
        // - Notification can't be saved (either for failing validation or just being persisted).
        // - Notification is not properly cancelled.
        expect(result.ok).toBeTruthy()
        expect(notificationRepository.notifications[0].cancelledAt.some).toBeTruthy()
    })
})
