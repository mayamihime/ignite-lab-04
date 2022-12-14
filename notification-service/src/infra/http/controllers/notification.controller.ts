import {
    Body,
    Controller,
    InternalServerErrorException,
    Logger,
    Post,
} from "@nestjs/common"
import { SendNotification } from "src/use-cases/send-notification"
import { CreateNotificationData } from "../dtos/create-notification.data"

@Controller("notifications")
export class NotificationController {
    private logger = new Logger("AppController")

    constructor(private sendNotification: SendNotification) {}

    @Post()
    async create(@Body() createNotificationData: CreateNotificationData) {
        const { recipientId, content, category } = createNotificationData

        const result = await this.sendNotification.execute({
            content,
            category,
            recipientId,
        })

        switch (result.ok) {
            case true:
                const { notification } = result.val
                return {
                    notification,
                }
            case false:
                this.logger.error(
                    `Failed to create notification: ${result.val.name} - ${result.val.message}`,
                    result.val.stack
                )
                throw new InternalServerErrorException()
        }
    }
}
