
declare class ServerResponse {
    constructor(status?: number, msg?: string, data?: object | null);
    status: number;
    msg?: string;
    data?: object | null;
    getData(): object | null;
    getStatus(): number;
    static success(msg: string, data: object, status?: number): object;
    static error(msg: string, status?: number): object;
}