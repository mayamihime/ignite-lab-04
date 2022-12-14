import { IsNotEmpty, IsString, IsUUID, Length } from "class-validator"

export class CreateNotificationData {
    @IsNotEmpty()
    @IsUUID()
    public recipientId: string

    @IsString()
    @Length(3, 255)
    public content: string

    @IsString()
    @IsNotEmpty()
    public category: string
}
