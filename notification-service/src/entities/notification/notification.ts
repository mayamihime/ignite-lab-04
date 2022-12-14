import { randomUUID } from "crypto"
import { Replace } from "src/helpers/replace"
import { Content } from "./content"

export interface NotificationProps {
    content: Content
    category: string
    recipientId: string
    readAt?: Date | null
    createdAt: Date
}

export class Notification {
    private _id: string

    public static create(
        props: Replace<NotificationProps, { createdAt?: Date }>
    ): Notification {
        return new Notification({
            ...props,
            createdAt: props.createdAt ?? new Date()
        })
    }

    private constructor(
        private props: NotificationProps
    ) {
        this._id = randomUUID()
    }

    public setContent(content: Content) {
        this.props.content = content
    }

    public setCategory(category: string) {
        this.props.category = category
    }

    public setRecipientId(recipientId: string) {
        this.props.recipientId = recipientId
    }

    public setReadAt(readAt: Date | null | undefined) {
        this.props.readAt = readAt
    }

    public get content(): Content {
        return this.props.content
    }

    public get category(): string {
        return this.props.category
    }

    public get recipientId(): string {
        return this.props.recipientId
    }

    public get readAt(): Date | null | undefined {
        return this.props.readAt
    }

    public get createdAt(): Date {
        return this.props.createdAt
    }

    public get id(): string {
        return this._id
    }
}
