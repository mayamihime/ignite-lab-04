import { randomUUID } from "crypto"
import { Replace } from "@helpers/replace"
import { Content } from "./content"
import { Err, None, Ok, Option, Result, Some } from "ts-results"
import { Logger } from "@nestjs/common"
import { ValidationError } from "@errors/validation.error"

export interface NotificationProps {
    id: string
    content: Content
    category: string
    recipientId: string
    readAt: Option<Date>
    cancelledAt: Option<Date>
    createdAt: Option<Date>
}

export type NotificationData = Replace<
    NotificationProps,
    {
        content: string
        readAt: Date | null
        cancelledAt: Date | null
        createdAt: Date | null
    }
>

export type CreateNotification = Replace<
    NotificationProps,
    {
        createdAt?: Date | null
        readAt?: Date | null
        cancelledAt?: Date | null
        id?: string
    }
>

export class Notification {
    public static logger = new Logger("Notification")

    public static create(
        props: CreateNotification
    ): Result<Notification, ValidationError> {
        try {
            return Ok(
                new Notification({
                    ...props,
                    createdAt: props.createdAt ? Some(props.createdAt) : None,
                    readAt: props.readAt ? Some(props.readAt) : None,
                    cancelledAt: props.cancelledAt
                        ? Some(props.cancelledAt)
                        : None,
                    id: props.id ?? randomUUID(),
                })
            )
        } catch (error) {
            return Err(error as ValidationError)
        }
    }

    private constructor(private props: NotificationProps) {}

    /**
     * Retrieves an exposed property.
     */
    public get<K extends keyof NotificationProps>(
        key: K
    ): NotificationProps[K] {
        return this.props[key]
    }

    public read(): void {
        if (this.get("readAt").some)
            Notification.logger.warn(
                `Reading notification that is already marked as read. (ID ${this.get(
                    "id"
                )})`
            )
        this.props.readAt = Some(new Date())
    }

    public unread(): void {
        if (this.get("readAt").none)
            Notification.logger.warn(
                `Unmarking notification that is already not marked as ready. (ID ${this.get(
                    "id"
                )})`
            )
        this.props.readAt = None
    }

    public cancel(): void {
        if (this.get("cancelledAt").some)
            Notification.logger.warn(
                `Cancelling notification that is already marked as cancelled. (ID ${this.get(
                    "id"
                )})`
            )
        this.props.cancelledAt = Some(new Date())
    }

    /**
     * Returns a more response friendly representation of the data.
     */
    public toData(): NotificationData {
        return {
            ...this.props,
            content: this.get("content").value,
            createdAt: this.get("createdAt").unwrapOr(null),
            readAt: this.get("readAt").unwrapOr(null),
            cancelledAt: this.get("cancelledAt").unwrapOr(null),
        }
    }
}
