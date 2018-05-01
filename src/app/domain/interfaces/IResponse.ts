export interface IResponse {
    status: number;
    error?: {
        message?: string;
    }
    message?: any;
    data: any;
}