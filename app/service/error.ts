import { Service } from 'egg';
import { Model, Instance, Operators } from 'sequelize';
import * as moment from 'moment';
import ServerResponse from '../util/serverResponse';
import { IResponseCode } from '../constant/responseCode';
import { awaitWrapper } from './../util/util';
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


    async updates(updates) {

        const [err, errors] = await awaitWrapper(this.ErrorModel.update(updates.updateData, {
            where: {
              id: {
                [this.Op.in]: updates.errorList
              }
            }
          }));
        if (err) {
            return this.ServerResponse.error('内部错误', this.ResponseCode.ERROR_ARGUMENT);
        } else {
            if (errors.length) {
                return this.ServerResponse.success('异常更新成功');
            } else {
                return this.ServerResponse.error('异常不存在', this.ResponseCode.NO_CONTENT);
            }
        }
        
    }


    async list(data) {
        const { startTime, endTime,pageSize = 1, page = 1,projectId } = data;
        const startDate = moment(startTime).format('YYYY-MM-DD HH:mm:ss');
        const endDate = moment(endTime).format('YYYY-MM-DD HH:mm:ss');
        const error = await this.ErrorModel.findAndCountAll({
            where: {
                updated_at: {
                    [this.Op.between]: [startDate, endDate]
                },
                projectId
            },
            limit: 20,
            offset: (page - 1) * pageSize
        })
        if (error) {
            return this.ServerResponse.success('查询成功', { totalCount: error.count || 0, data: error.rows || [] });
        } else {
            return this.ServerResponse.error('查询失败')
        }
    }
}