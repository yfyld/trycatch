import { Service } from 'egg';
import * as moment from 'moment';
import { Model, Instance, Operators } from 'sequelize';
import * as _ from 'lodash';
import ServerResponse from '../util/serverResponse';
import { IResponseCode } from '../constant/responseCode';
import table from '../constant/table';
import {CreateLogParams} from "../../types"


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

    getLog({ startTime, endTime, errorId}, month) {
        const startDate = moment(startTime).format('YYYY-MM-DD HH:mm:ss');
        const endDate = moment(endTime).format('YYYY-MM-DD HH:mm:ss');
        
        return this.LogModel.findAndCountAll({
            attributes: ['id', 'type', 'projectId', 'url'],
            where: {
                created_at: {
                    [this.Op.between]: [startDate, endDate]
                },
                errorId,
                month
            },
            order: [['id', 'desc']]
        })
    
        
    }

    async list({startTime, endTime, errorId}) {
        const startMonth = moment(startTime).format('YYYY_MM');
        const endMonth = moment(endTime).format('YYYY_MM');
        let startIndex = _.findIndex(table, m => m === startMonth);
        let endIndex = _.findIndex(table, m => m === endMonth);
        if (startIndex < 0) {
            startIndex = 0;
        }
        if (endIndex >= table.length) {
            endIndex = table.length - 1;
        }
        const promises: any[] = [];
        for (let i = startIndex; i <= endIndex; i++) {
            promises.push(this.getLog({startTime, endTime, errorId}, table[i]));
        }
        
        const log = await Promise.all([...promises]);
        
        const data = log.reduce((data, item) => {
            return {
                totalCount: data.totalCount + item.count,
                list: data.list.concat(item.rows)
            }
        }, {totalCount: 0, list: []} )
        // 暂时没做异常处理
        return this.ServerResponse.success('查询成功', data);
       
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

    async checkErrorExist(errorId) {
        const data = await this.ErrorModel.findOne({where: { errorId }});
        return data;
    }
    
    
    async create({errorId, projectId, ...log}:CreateLogParams) {
        const id:number = await this.getId('logId');
        const y_m = moment().format('YYYY_MM');
        await this.ctx.app.redis.zadd('id', String(id), y_m);
        const data = await this.LogModel.create({
            ...log,
            errorId,
            projectId,
            id,
            month: y_m
        });
        const error: any = await this.ErrorModel.findOne({where: { id:errorId }});
        if (!error) {
            await this.ErrorModel.create({
                id:errorId,
                projectId,
                type:log.type,
                version:log.version,
                status:"UNSOLVED",
                url:log.url,
                page:log.page,
                name:log.name,
                message:log.message
            });
        } else {
            error.eventCount = error.eventCount + 1;
            if(error.status==="SOLVED"){
               error.status="UNSOLVED"
            }
            await error.save();
        }
        if (data) {
            return this.ServerResponse.success('日志添加成功');
        } else {
            return this.ServerResponse.error('日志添加失败');
        }
    }


    async show(id) {
        const y_m = await this.ctx.app.redis.zrangebyscore('id', id, '+inf');
        const data = await this.LogModel.findOne({
            where: {
                id,
                month: y_m[0]
            }
        })
        if (data) {
            return this.ServerResponse.success('查询成功', data);
        } else {
            return this.ServerResponse.error('查询失败');
        }
    }
}