import { Service } from 'egg';
import { Model, Instance, Operators } from 'sequelize';
import ServerResponse from '../util/serverResponse';
import { IResponseCode } from '../constant/responseCode';


export default class Log extends Service {

    LogModel: Model<Instance<{}>, {}>;
    IdModel: Model<Instance<{}>, {}>;
    ErrorModel: Model<Instance<{}>, {}>;
    ServerResponse: typeof ServerResponse;
    ResponseCode: IResponseCode;
    Op: Operators;
    constructor(ctx) {
        super(ctx);
        this.ctx = ctx;
        this.LogModel = ctx.model.Log;
        this.ErrorModel = ctx.model.Error;
        this.IdModel = ctx.model.Id;
        this.ServerResponse = ctx.response.ServerResponse;
        this.ResponseCode = ctx.response.ResponseCode;
        this.Op = ctx.app.Sequelize.Op;
    }

    async list({ page = 1, pageSize = 10}) {
        const data = await this.LogModel.findAndCountAll({
            attributes: ['id', 'type', 'projectId', 'url'],
            offset: (page - 1) * pageSize,
            limit: pageSize,
            order: [['id', 'desc']]
        })
    
        if (data) {
            return this.ServerResponse.success('查询成功', { totalCount: data.count || 0, list: data.rows || [] });
        } else {
            return this.ServerResponse.error('查询失败');
        }
    }

    async getId(type) {
        const data = await this.IdModel.findOne();
        if (data) {
            data[type]++;
            await data.save();
            return data[type];
        } else {
            await this.IdModel.create({
                logId: 1
            })
            return 1;
        }
    }

    async create(log) {
        const id = this.getId('logId');
        const data = await this.LogModel.create({...log, id});
        if (data) {
            return this.ServerResponse.success('日志添加成功');
        } else {
            return this.ServerResponse.error('日志添加失败');
        }
    }
}