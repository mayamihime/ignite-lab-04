import { Content } from "./content"

describe("notification content validation", () => {
    it("should succeed with text within accepted length", () => {
        expect(
            Content.create("Mark invited you to play The Game.").unwrap() // made you lose, heh
        ).toBeTruthy()
    })

    it("should fail with text that is too short", () => {
        expect(Content.create("dn").unwrap).toThrowError()
    })

    it("should fail with text that is too long", () => {
        expect(Content.create("_".repeat(255)).unwrap).toThrowError()
    })
})
