import { Controller } from 'egg';

export default class ErrorController extends Controller {
    
    // 错误列表
    async index() {
        const { ctx } = this;
        const startTime = ctx.helper.parseInt(ctx.query.startTime);
        const endTime = ctx.helper.parseInt(ctx.query.endTime);
        const page = ctx.helper.parseInt(ctx.query.page);
        ctx.body = await ctx.service.error.list({...ctx.query, startTime, endTime, page});
    }

    // // 某个项目错误列表
    // async query() {
        
    // }

    // // 错误事件详情
    // async show() {
    //     const { ctx } = this;
    //     const id = ctx.helper.parseInt(ctx.params.id);
    //     ctx.body = await ctx.service.error.show({...ctx.query, id});
    // }


    // 统计每天错误个数
    async stat() {
        const { ctx } = this;
        const query = { ...ctx.query };
        query.startTime = ctx.helper.parseInt(query.startTime);
        query.endTime = ctx.helper.parseInt(query.endTime);
        console.log(query);
        ctx.body = await ctx.service.error.stat({...query});
    }
}