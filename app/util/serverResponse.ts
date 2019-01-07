const { SUCCESS, ERROR } = require('../constant/responseCode');

module.exports = class ServerResponse {
    status: number;
    msg?: string;
    data?: object | null;

    constructor(status: number, msg?: string, data?: object | null) {
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

    static success(msg: string = '', data: object = {}, status: number = SUCCESS) {
        return new ServerResponse(status, msg, data)
    }

    static error(msg: string = '', status: number = ERROR) {
        return new ServerResponse(status, msg, null)
    }
}