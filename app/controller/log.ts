import { Controller } from 'egg';

export default class LogController extends Controller {


    public async create() {
        const { ctx } = this;
        const { authInfo = {}, data = {} } = ctx.request.body;
        const { type, url } = data;
        const apikey = new Buffer(authInfo.apikey, 'base64');
        const project = apikey.toString() ? JSON.parse(apikey.toString()) : {};
        const projectId = project.projectId;
        const version = authInfo.version;
        ctx.body = await ctx.service.log.create({
            type, url, source: JSON.stringify(ctx.request.body),
            projectId, version
        });
    }
}