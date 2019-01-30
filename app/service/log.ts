import { Service } from 'egg'
import * as moment from 'moment'
import { Model, Instance, Operators } from 'sequelize'
import * as _ from 'lodash'
import ServerResponse from '../util/serverResponse'
import { IResponseCode } from '../constant/responseCode'
import table from '../constant/table'
import { CreateLogParams } from '../../types'
import { awaitWrapper } from '../util/util'

export default class Log extends Service {
  LogModel: Model<Instance<{}>, {}>
  IdModel: Model<Instance<{}>, {}>
  ErrorModel: Model<Instance<{}>, {}>
  ServerResponse: typeof ServerResponse
  ResponseCode: IResponseCode
  Op: Operators
  constructor(ctx) {
    super(ctx)
    this.ctx = ctx
    this.LogModel = ctx.model.Log
    this.ErrorModel = ctx.model.Error
    this.IdModel = ctx.model.Id
    this.ServerResponse = ctx.response.ServerResponse
    this.ResponseCode = ctx.response.ResponseCode
    this.Op = ctx.app.Sequelize.Op
  }

  getLog({ startTime, endTime, errorId }, month) {
    const startDate = moment(startTime).format('YYYY-MM-DD HH:mm:ss')
    const endDate = moment(endTime).format('YYYY-MM-DD HH:mm:ss')

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

  async list({
    startTime = 1546272000000,
    endTime = 1861891200000,
    errorId,
    page = 1,
    pageSize = 20
  }) {
    const startMonth = moment(startTime).format('YYYY_MM')
    const endMonth = moment(endTime).format('YYYY_MM')
    let startIndex = _.findIndex(table, m => m === startMonth)
    let endIndex = _.findIndex(table, m => m === endMonth)
    if (startIndex < 0) {
      startIndex = 0
    }
    if (endIndex < 0) {
      endIndex = table.length - 1
    }
    const startDate = moment(startTime).format('YYYY-MM-DD HH:mm:ss')
    const endDate = moment(endTime).format('YYYY-MM-DD HH:mm:ss')
    const sqls: string[] = []
    for (let i = startIndex; i <= endIndex; i++) {
      sqls.push(
        ` SELECT  url, project_id  AS  projectId, error_id  AS  errorId, custom_id  AS  customId  FROM  log_${
          table[i]
        }  WHERE  error_id=${errorId}  AND  updated_at  BETWEEN  '${startDate}'  AND  '${endDate}' `
      )
    }

    const [err, logs] = await awaitWrapper(
      this.app.model.query(
        sqls.join(' UNION ALL \n') +
          ` LIMIT  ${(page - 1) * pageSize},${page * pageSize};`,
        { type: this.app.Sequelize.QueryTypes.SELECT }
      )
    )

    if (err) {
      return this.ServerResponse.error(
        '内部错误',
        this.ResponseCode.ERROR_ARGUMENT
      )
    } else {
      if (logs) {
        return this.ServerResponse.success('查询成功', logs)
      } else {
        return this.ServerResponse.error('查询失败')
      }
    }
  }

  async getId(type) {
    const data = await this.IdModel.findOne()
    if (data) {
      data[type]++
      await data.save()
      return data[type]
    } else {
      await this.IdModel.create({
        logId: 1
      })
      return 1
    }
  }

  async checkErrorExist(errorId) {
    const data = await this.ErrorModel.findOne({ where: { errorId } })
    return data
  }

  async create({ errorId, projectId, ...log }: CreateLogParams) {
    const id: number = await this.getId('logId')
    const y_m = moment().format('YYYY_MM')
    await this.ctx.app.redis.zadd('id', String(id), y_m)
    const data = await this.LogModel.create({
      ...log,
      errorId,
      projectId,
      id,
      month: y_m
    })
    const error: any = await this.ErrorModel.findOne({ where: { id: errorId } })
    if (!error) {
      await this.ErrorModel.create({
        id: errorId,
        projectId,
        type: log.type,
        version: log.version,
        status: 'UNSOLVED',
        url: log.url,
        page: log.page,
        name: log.name,
        message: log.message
      })
    } else {
      error.eventCount = error.eventCount + 1
      if (error.status === 'SOLVED') {
        error.status = 'UNSOLVED'
      }
      await error.save()
    }
    if (data) {
      return this.ServerResponse.success('日志添加成功')
    }
  }

  async show(id) {
    const [err, y_m] = await awaitWrapper(
      this.ctx.app.redis.zrangebyscore('id', id, '+inf')
    )
    if (err) {
      return this.ServerResponse.error(
        '内部错误',
        this.ResponseCode.ERROR_ARGUMENT
      )
    } else {
      const [err1, data] = await awaitWrapper(
        this.LogModel.findOne({
          where: {
            id,
            month: y_m[0]
          }
        })
      )
      if (err1) {
        return this.ServerResponse.error(
          '内部错误',
          this.ResponseCode.ERROR_ARGUMENT
        )
      } else {
        if (data) {
          return this.ServerResponse.success('查询成功', data)
        } else {
          return this.ServerResponse.error(
            '查询无数据',
            this.ResponseCode.NO_CONTENT
          )
        }
      }
    }
  }
}
