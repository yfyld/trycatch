import { Service } from 'egg';
import { Model, Instance, Operators } from 'sequelize';
import * as moment from 'moment';
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

    async show({id, month}) {
        const data = await this.LogModel.findOne({
            where: {
                id,
                month
            }
        });
        console.log(data);
        return 12;
    }


    async list(data) {
        const { startTime, endTime, page = 1 } = data;
        const startDate = moment(startTime).format('YYYY-MM-DD HH:mm:ss');
        const endDate = moment(endTime).format('YYYY-MM-DD HH:mm:ss');
        const error = await this.ErrorModel.findAndCountAll({
            where: {
                updated_at: {
                    [this.Op.between]: [startDate, endDate]
                },
                limit: 20,
                offset: (page - 1) * 20
                
            }
        })
        if (error) {
            return this.ServerResponse.success('查询成功', { totalCount: error.count || 0, list: error.rows || [] });
        } else {
            return this.ServerResponse.error('查询失败')
        }
    }
}