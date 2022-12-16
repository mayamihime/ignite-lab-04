import { Content } from "@application/entities/notification/content"
import { Notification } from "@application/entities/notification/notification"
import { FleetingNotificationRepository } from "@application/repositories/fleeting/notification"
import { FetchRecipientNotifications } from "./fetch-recipient-notifications"

import { TEST } from "../../constants"

describe("count notifications", () => {
    const notificationRepository = new FleetingNotificationRepository()
    it("should be able to execute", async () => {
        for (let i = 0; i <= 1; i++) {
            await notificationRepository.create(
                Notification.create({
                    content: Content.create(TEST.NOTIFICATION.CONTENT).unwrap(),
                    category: TEST.NOTIFICATION.CATEGORY,
                    recipientId: TEST.NOTIFICATION.RECIPIENT_ID,
                })
            )
        }

        await notificationRepository.create(Notification.create({
            content: Content.create(TEST.NOTIFICATION.CONTENT).unwrap(),
            category: TEST.NOTIFICATION.CATEGORY,
            recipientId: "eWVzLCBldmVyeXRoaW5nIGlzIGJhc2UgNjQK"
        }))

        const result = await new FetchRecipientNotifications(notificationRepository).execute({
            recipientId: TEST.NOTIFICATION.RECIPIENT_ID
        })

        expect(result.ok).toBeTruthy()
        if (result.ok) {
            expect(result.val.notifications).toHaveLength(2)
            expect(result.val.notifications).toEqual(expect.arrayContaining([
                expect.objectContaining({ recipientId: TEST.NOTIFICATION.RECIPIENT_ID }),
                expect.objectContaining({ recipientId: TEST.NOTIFICATION.RECIPIENT_ID }),
            ]))
        }
    })
})
