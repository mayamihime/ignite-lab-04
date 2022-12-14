import { FleetingNotificationRepository } from "../repositories/fleeting/notification"
import { SendNotification } from "./send-notification"

describe("send notification", () => {
    const notificationRepository = new FleetingNotificationRepository()
    
    it("should be able to execute", async () => {
        const { ok, val } = await new SendNotification(notificationRepository).execute({
            content: "Rick Astley said he will never give you up.",
            category: "misc",
            recipientId: "bGlnbWEK" // i can't believe it
        })

        expect(notificationRepository.notifications).toHaveLength(1)
        expect(ok).toBeTruthy()
        if (ok) expect(val.notification).toEqual(notificationRepository.notifications[0])
    })
})
