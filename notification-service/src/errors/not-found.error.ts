import { DatabaseError } from "./database.error"

interface NotFoundErrorOptions {
    resource?: string
}

export class NotFoundError extends DatabaseError {
    /**
    * Which resource was expected to exist (a key or name).
    */
    public resource: string | null

    constructor(message: string, options?: NotFoundErrorOptions) {
        super(message)

        this.resource = options?.resource ?? null
    }
}
