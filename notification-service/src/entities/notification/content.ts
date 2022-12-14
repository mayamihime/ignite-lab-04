import { Err, Ok, Result } from "ts-results"

export class Content {
    public static create(content: string): Result<Content, Error> {
        return (new Content(content)).validate()
    }

    private constructor(private readonly content: string) {}

    private validate(): Result<Content, Error> {
        if (this.content.length < 3 || this.content.length > 255)
            return Err(new Error(`Length is either too small or too big.`))

        return Ok(this)
    }

    public get value(): string {
        return this.content
    }
}
