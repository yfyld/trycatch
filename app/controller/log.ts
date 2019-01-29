import { Controller } from 'egg'
import { CreateLogParams,LogRequestBody } from '../../types'
export default class LogController extends Controller {
  public async index() {
    const { ctx } = this
    const query = { ...ctx.query }
    query.page = ctx.helper.parseInt(query.page)
    query.pageSize = ctx.helper.parseInt(query.pageSize)
    query.startTime = ctx.helper.parseInt(query.startTime)
    query.endTime = ctx.helper.parseInt(query.endTime)
    query.errorId = ctx.helper.parseInt(query.errorId)
    ctx.body = await ctx.service.log.list(query)
  }

  public async create() {
    const { ctx } = this
    const requestBody: LogRequestBody =
      typeof ctx.request.body === 'string'
        ? JSON.parse(ctx.request.body)
        : { ...ctx.request.body }

    const { authInfo, data } = requestBody
    const { type, page, errorId } = data

    const apikey = Buffer.from(authInfo.apikey || '', 'base64')
    const project: { projectId: number } = apikey.toString()
      ? JSON.parse(apikey.toString())
      : {}

    const projectId: number = project.projectId
    const version = authInfo.version

    const logData: CreateLogParams = {
      type,
      page,
      projectId,
      version,
      errorId,
      source:
        typeof ctx.request.body === 'string'
          ? ctx.request.body
          : JSON.stringify(ctx.request.body)
    }

    if (type === 'HTTP_ERROR' && data.response && data.request) {
      logData.status = data.response.status
      logData.url = data.request.url
      logData.message = data.response.description
        ? data.response.description.substr(0, 200)
        : ''
      logData.name = data.response.statusText
    } else {
      logData.name = data.name
      logData.message = data.message
      if(data.stack&&data.stack.length){
        logData.url=data.stack[0].url
      }
    }
    ctx.body = await ctx.service.log.create(logData)
  }

  async show() {
    const { ctx } = this
    const id = ctx.helper.parseInt(ctx.params.id)
    ctx.body = await ctx.service.log.show(id)
  }
}
