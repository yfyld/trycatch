import { Service } from 'egg';
import { Model, Instance, Operators } from 'sequelize';
import ServerResponse from '../util/serverResponse';
import { IResponseCode } from '../constant/responseCode';

export default class Error extends Service {

    ErrorModel: Model<Instance<{}>, {}>;
    LogModel: Model<Instance<{}>, {}>;
    ServerResponse: typeof ServerResponse;
    ResponseCode: IResponseCode;
    Op: Operators;
    constructor(ctx) {
        super(ctx);
        this.ctx = ctx;
        this.ErrorModel = ctx.model.Error;
        this.LogModel = ctx.model.Log;
        this.ServerResponse = ctx.response.ServerResponse;
        this.ResponseCode = ctx.response.ResponseCode;
        this.Op = ctx.app.Sequelize.Op;
    }

    async show(id) {
        console.log(id);
        return 12;
        // const [err, error] = await awaitWrapper(this.)
    }
}