import { Service } from 'egg';
import { Model, Instance, Operators } from 'sequelize';
import ServerResponse from '../util/serverResponse';
import { IResponseCode } from '../constant/responseCode';

export default class Log extends Service {

    LogModel: Model<Instance<{}>, {}>;
    ServerResponse: typeof ServerResponse;
    ResponseCode: IResponseCode;
    Op: Operators;
    constructor(ctx) {
        super(ctx);
        this.ctx = ctx;
        this.LogModel = ctx.model.Log;
        this.ServerResponse = ctx.response.ServerResponse;
        this.ResponseCode = ctx.response.ResponseCode;
        this.Op = ctx.app.Sequelize.Op;
    }

    async list(data: object) {
        console.log(data);
        return 'abcd';
    }

    async create(log) {
        const data = await this.LogModel.create(log);
        if (data) {
            return this.ServerResponse.success('日志添加成功');
        } else {
            return this.ServerResponse.error('日志添加失败');
        }
    }
}