import { Body, Controller, Get, Logger, Post } from "@nestjs/common"
import { PrismaService } from "./prisma/prisma.service"
import { randomUUID } from "crypto"
import { CreateNotificationData } from "./dto/create-notification.data"

@Controller("notifications")
export class AppController {
    private logger = new Logger("AppController")

    constructor(private readonly prismaService: PrismaService) {}

    @Get()
    index() {
        return this.prismaService.notification.findMany()
    }

    @Post()
    async create(@Body() createNotificationData: CreateNotificationData) {
        const { recipientId, content, category } = createNotificationData

        try {
            const result = await this.prismaService.notification.create({
                data: {
                    id: randomUUID(),
                    category,
                    content,
                    recipientId,
                },
            })
            this.logger.debug(`Created notification: ${result.id}.`)

            return result
        } catch (error) {
            this.logger.error("Failed to create notification.", error.stack)
        }
    }
}
