import { Content } from "./content"
import { Notification } from "./notification"

describe("notification", () => {
    it("should be able to be created", () => {
        expect(Notification.create({
            content: Content.create("You've received a gift.")
                .unwrap(),
            category: "misc",
            recipientId: "ZGVleiBudXRzCg==" // (-w-)
        })).toBeTruthy()
    })
})
