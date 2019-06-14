import { Service } from 'egg'
import { Model, Instance, Operators } from 'sequelize'
import * as moment from 'moment'
import * as _ from 'lodash'
import ServerResponse from '../util/serverResponse'
import { IResponseCode } from '../constant/responseCode'
import { awaitWrapper } from './../util/util'
export default class Error extends Service {
  ErrorModel: Model<Instance<{}>, {}>
  LogModel: Model<Instance<{}>, {}>
  ServerResponse: typeof ServerResponse
  ResponseCode: IResponseCode
  Op: Operators
  constructor(ctx) {
    super(ctx)
    this.ctx = ctx
    this.ErrorModel = ctx.model.Error
    this.LogModel = ctx.model.Log
    this.ServerResponse = ctx.response.ServerResponse
    this.ResponseCode = ctx.response.ResponseCode
    this.Op = ctx.app.Sequelize.Op
  }

  
  async updates(updates) {
    const [err, errors] = await awaitWrapper(
      this.ErrorModel.update(updates.updateData, {
        where: {
          id: {
            [this.Op.in]: updates.errorList
          }
        }
      })
    )
    if (err) {
      return this.ServerResponse.error(
        '内部错误',
        this.ResponseCode.ERROR_ARGUMENT
      )
    } else {
      if (errors.length) {
        return this.ServerResponse.success('异常更新成功')
      } else {
        return this.ServerResponse.error(
          '异常不存在',
          this.ResponseCode.NO_CONTENT
        )
      }
    }
  }

  getData(data) {
    const {
      startTime,
      endTime,
      pageSize = 20,
      page = 1,
      projectId,
      ...query
    } = data
    const startDate = moment(startTime).format('YYYY-MM-DD HH:mm:ss')
    const endDate = moment(endTime).format('YYYY-MM-DD HH:mm:ss')

    const selectOption: any = {
      where: {
        updated_at: {
          [this.Op.between]: [startDate, endDate]
        },
        projectId
      },
      limit: pageSize,
      offset: (page - 1) * pageSize
    }

    if (query.orderKey) {
      selectOption.order = [[query.orderKey, query.order]]
    }
    if (query.level) {
      selectOption.where.level = query.level
    }
    if (query.status) {
      selectOption.where.status = query.status
    }
    if (query.type) {
      selectOption.where.type = query.type
    }
    if (query.version) {
      selectOption.where.version = query.version
    }

    return this.ErrorModel.findAndCountAll(selectOption)
  }

  async list(data) {
    const [err, error] = await awaitWrapper(this.getData(data))
    if (err) {
      return this.ServerResponse.error(
        '内部错误',
        this.ResponseCode.ERROR_ARGUMENT
      )
    } else {
      return this.ServerResponse.success('查询成功', {
        totalCount: error.count || 0,
        list: error.rows || []
      })
    }
  }

  async stat({ startTime, endTime }) {
    const startDate = moment(startTime).format('YYYY-MM-DD HH:mm:ss')
    const endDate = moment(endTime).format('YYYY-MM-DD HH:mm:ss')
    const [err, data] = await awaitWrapper(
      this.ErrorModel.findAll({
        where: {
          updated_at: {
            [this.Op.between]: [startDate, endDate]
          }
        }
      })
    )
    if (err) {
      console.log(err)
      return this.ServerResponse.error(
        '内部错误',
        this.ResponseCode.ERROR_ARGUMENT
      )
    } else {
      if (data.length > 0) {
        const error =
          data &&
          data.map((item: any) => {
            return {
              ...item,
              day: moment(item.dataValues.updated_at).format('YYYY-MM-DD')
            }
          })
        const statError = _.groupBy(error, 'day')
        const statSum = Object.keys(statError).map(item => ({
          day: item,
          sum: statError[item].length
        }))
        return this.ServerResponse.success('查询成功', statSum)
      } else {
        return this.ServerResponse.success(
          '查询无数据',
          [],
          this.ResponseCode.NO_CONTENT
        )
      }
    }
  }

  async status({ errorIds, status }) {
    const errorList = errorIds.split(',')
    const [err, data] = await awaitWrapper(
      this.ErrorModel.update({
        status,
        where: {
          [this.Op.in]: errorList
        }
      })
    )
    if (err) {
      return this.ServerResponse.error(
        '内部错误',
        this.ResponseCode.ERROR_ARGUMENT
      )
    } else {
      if (data) {
        return this.ServerResponse.success('更新成功')
      } else {
        return this.ServerResponse.error('更新失败')
      }
    }
  }
}
