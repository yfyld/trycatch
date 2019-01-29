import { Controller } from 'egg';

export default class ErrorController extends Controller {
    
    // 错误列表
    async index() {
        const { ctx } = this;
        const query={...ctx.query}
        query.startTime = ctx.helper.parseInt(ctx.query.startTime);
        query.endTime = ctx.helper.parseInt(ctx.query.endTime);
        query.page = ctx.helper.parseInt(ctx.query.page)||1;
        query.pageSize = ctx.helper.parseInt(ctx.query.pageSize)||20;
        query.projectId = ctx.helper.parseInt(ctx.query.projectId)
        ctx.body = await ctx.service.error.list(query);
    }

    // 某个项目错误列表
    async query() {
        
    }

    
    async updates() {
        interface RequestBody{
            errorList:number[],
            updateData:{
                type?:string,
                status?:string,
                owner?:number
            }
        }
        const { ctx } = this;
        const requestBody:RequestBody={...ctx.request.body}
        ctx.body = await ctx.service.error.updates(requestBody);
    }

    // 错误事件详情
    async show() {
        const { ctx } = this;
        const id = ctx.helper.parseInt(ctx.params.id);
        ctx.body = await ctx.service.error.show({...ctx.query, id});
    }
}