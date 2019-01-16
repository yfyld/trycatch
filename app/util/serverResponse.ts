
import { SUCCESS, ERROR } from '../constant/responseCode';

export default class ServerResponse {
    status: number;
    msg?: string;
    data?: object | string | null;

    constructor(status: number, msg?: string, data?: object | string | null) {
        this.status = status;
        this.msg = msg;
        this.data = data;
    }

    getData() {
        return this.data;
    }

    getStatus() {
        return this.status;
    }
    isSuccess() {
        return this.status === SUCCESS;
    }

    static success(msg: string = '', data: object | string = {}, status: number = SUCCESS) {
        return new ServerResponse(status, msg, data)
    }

    static error(msg: string = '', status: number = ERROR) {
        return new ServerResponse(status, msg, null)
    }
}

export class CServerResponse {
    status: number;
    msg?: string;
    data?: object | string | null;
    getData: () => object | string | null | undefined;
    getStatus: () => number;
    isSuccess: () => boolean;
    static success: (msg: string, data: object | string, status: number) => object;
    static error: (msg: string, status: number) => object
}