export class MpesaError extends Error {
    public statusCode?: number;
    public responseData?: any;

    constructor(message: string, statusCode?: number, responseData?: any) {
        super(message);
        this.name = 'MpesaError';
        this.statusCode = statusCode;
        this.responseData = responseData;

        Error.captureStackTrace(this, this.constructor);
    }
}
