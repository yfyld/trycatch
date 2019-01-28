import { Controller } from 'egg';

export default class LogController extends Controller {

    public async index() {
        const { ctx } = this;
        const query = { ...ctx.query };
        query.page = ctx.helper.parseInt(query.page);
        query.pageSize = ctx.helper.parseInt(query.pageSize);
        query.startTime = ctx.helper.parseInt(query.startTime);
        query.endTime = ctx.helper.parseInt(query.endTime);
        ctx.body = await ctx.service.log.list(query);
    }

    public async create() {
        const { ctx } = this;
        const json = typeof ctx.request.body === 'string' ? JSON.parse(ctx.request.body) : {};
   
        const { authInfo = {}, data = {} } = json;
        const { type, url, errorId } = data;
        const apikey = Buffer.from(authInfo.apikey || '', 'base64');
        const project = apikey.toString() ? JSON.parse(apikey.toString()) : {};
       
        const projectId = project.projectId;
        const version = authInfo.version;
        ctx.body = await ctx.service.log.create({
            type, url, source: typeof ctx.request.body === 'string' ? ctx.request.body : JSON.stringify(ctx.request.body),
            projectId, version, errorId
        });
    }
}