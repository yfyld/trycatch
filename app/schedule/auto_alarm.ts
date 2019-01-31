import { Subscription } from 'egg'
import * as moment from 'moment'
import axios from 'axios'

class AutoAlarm extends Subscription {
  ErrorModel: any
  UserModel:any
  constructor(ctx) {
    super(ctx)
    this.ErrorModel = ctx.model.Error
    this.UserModel = ctx.model.User
  }
  static get schedule() {
    return {
      interval: '10m',
      type: 'all',
      immediate:true
    }
  }

  async subscribe() {
    const Op = this.ctx.app.Sequelize.Op

    const errors = await this.ErrorModel.findAll({
      where: {
        updated_at: {
          [Op.gt]: Date.now() - 600 * 1000
        }
      },
      raw: true
    })

    if (!errors.length) {
      return
    }

    for (let error of errors) {
      const errorCount = await this.ctx.app.redis.hget(
        'errorCount',
        String(error.id)
      )
      if (!errorCount) {
        continue
      }
      const errorCountArr = errorCount.split('_')
      const count = Number(errorCountArr[0])
      const date = errorCountArr[1]
      let alarmCount = Number(errorCountArr[2])
      const now = moment().format('YYYY-MM-DD')
      const times = error.eventCount - Number(count)
      if (
        alarmCount === 0 ||
        (times > 1 && error.level === 3) ||
        (times > 10 && error.level === 2) ||
        (times > 100 && error.level === 1)
      ) {
        if (date === now) {
          if (alarmCount > 3) {
            continue
          } else {
            alarmCount++
          }
        } else {
          alarmCount = 1
        }

        await this.ctx.app.redis.hset(
          'errorCount',
          String(error.id),
          `${error.eventCount}_${now}_${alarmCount}`
        )
        const owner=await this.UserModel.findById(error.ownerId)
        axios.post(
          'https://oapi.dingtalk.com/robot/send?access_token=76dc9eda9d95b1ff3f0c77ee8e0a0ebe7b43a388dfebead943a97d5d25a81c5a',
          {
            msgtype: 'markdown',
            markdown: { title: error.name||error.type, text: `### ${error.type}  ${error.name}  @${owner.mobile} \n > ${error.message} ${error.url} \n * 错误等级: ${error.level} \n * 用户数:   ${error.userCount} \n * 事件数:   ${error.userCount} \n * 版本:   ${error.version} \n * 创建时间:  ${moment(error.created_at).format('YYYY-MM-DD HH:mm:ss')} \n * 更新时间:  ${moment(error.updated_at).format('YYYY-MM-DD HH:mm:ss')} \n [查看详情>>>](http://127.0.0.1:7001/error-details/${error.id})` },
            at: {
              atMobiles: [owner.mobile],
              isAtAll: false
            }
          }
        )
      }
    }
  }
}

export default AutoAlarm
