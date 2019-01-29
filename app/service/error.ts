import { Service } from 'egg';
import { Model, Instance, Operators } from 'sequelize';
import * as moment from 'moment';
import * as _ from 'lodash';
import ServerResponse from '../util/serverResponse';
import { IResponseCode } from '../constant/responseCode';
import { awaitWrapper } from '../util/util';

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

   
    getData({startTime, endTime, page = 1}) {
        const startDate = moment(startTime).format('YYYY-MM-DD HH:mm:ss');
        const endDate = moment(endTime).format('YYYY-MM-DD HH:mm:ss');
        return this.ErrorModel.findAndCountAll({
            where: {
                updated_at: {
                    [this.Op.between]: [startDate, endDate]
                }
            },
            limit: 20,
            offset: (page - 1) * 20
        })
    }

    async list(data) {
        const [err, error] = await awaitWrapper(this.getData(data));
        if (err) {
            return this.ServerResponse.error('内部错误', this.ResponseCode.ERROR_ARGUMENT);
        } else {
            return this.ServerResponse.success('查询成功', { totalCount: error.count || 0, data: error.rows || [] });
        }
        
    }


    async stat({startTime, endTime }) {
        const startDate = moment(startTime).format('YYYY-MM-DD HH:mm:ss');
        const endDate = moment(endTime).format('YYYY-MM-DD HH:mm:ss');
        const [err, data] = await awaitWrapper(this.ErrorModel.findAll({
            where: {
                updated_at: {
                    [this.Op.between]: [startDate, endDate]
                }
            }
        }))
        if (err) {
            console.log(err);
            return this.ServerResponse.error('内部错误', this.ResponseCode.ERROR_ARGUMENT);
        } else {
            if (data.length > 0) {
                const error = data && data.map((item: any) => {
                    return {...item, day: moment(item.dataValues.updated_at).format('YYYY-MM-DD')}
                });
                const statError = _.groupBy(error, 'day');
                const statSum = Object.keys(statError).map(item => ({ day: item, sum: statError[item].length}));
                return this.ServerResponse.success('查询成功', statSum);
            } else {
                return this.ServerResponse.success('查询无数据', [] ,this.ResponseCode.NO_CONTENT);
            }
        }
        
    }


    async status({errorIds, status}) {
        const errorList = errorIds.split(',');
        const [err, data] = await awaitWrapper(this.ErrorModel.update({
            status,
            where: {
                [this.Op.in]: errorList
            }
        }))
        if (err) {
            return this.ServerResponse.error('内部错误', this.ResponseCode.ERROR_ARGUMENT);
        } else {
            if (data) {
                return this.ServerResponse.success('更新成功');
            } else {
                return this.ServerResponse.error('更新失败');
            }
        }
        
    }
}