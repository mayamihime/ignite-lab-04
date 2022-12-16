export class ValidationError extends Error {
    private constructor(message: string) {
        super(message)
    }
}
