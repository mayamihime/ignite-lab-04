import { Content } from "../../application/entities/notification/content"
import { Notification } from "@application/entities/notification/notification"
import { FleetingNotificationRepository } from "@application/repositories/fleeting/notification"
import { UnreadNotification } from "./unread-notification"
import { Some } from "ts-results"

describe("unread notification", () => {
    const notificationRepository = new FleetingNotificationRepository()

    it("should be able to execute", async () => {
        const notification = Notification.create({
            content: Content.create("This should be unread.").unwrap(),
            category: "test",
            recipientId: "aSdtIG91dCBvZiBpZGVhcwo=",
            readAt: Some(new Date())
        })

        notificationRepository.create(notification)

        const result = await new UnreadNotification(notificationRepository)
            .execute({ id: notification.id })

        expect(result.ok).toBeTruthy()
        expect(notificationRepository.notifications[0].readAt.none).toBeTruthy()
    })
})
