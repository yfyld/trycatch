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


    // 统计每天错误个数
    async stat() {
        const { ctx } = this;
        const query = { ...ctx.query };
        query.startTime = ctx.helper.parseInt(query.startTime);
        query.endTime = ctx.helper.parseInt(query.endTime);
        ctx.body = await ctx.service.error.stat({...query});
    }

    // 批量修改 指定责任 状态 
    async updates() {
        interface RequestBody{
            errorList:number[],
            updateData:{
                status?:string,
                owner?:number
            }
        }
        const { ctx } = this;
        const requestBody:RequestBody={...ctx.request.body}
        ctx.body = await ctx.service.error.updates(requestBody);
    }


    // 错误状态修改
    async status() {
        const { ctx } = this;
        ctx.body = await ctx.service.error.status({...ctx.query});
    }
}