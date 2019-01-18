import { Controller } from 'egg';

export default class ErrorController extends Controller {
    
    // 错误列表
    async index() {

    }

    // 某个项目错误列表
    async query() {
        
    }

    // 错误事件详情
    async show() {
        const { ctx } = this;
        const id = ctx.helper.parseInt(ctx.params.id);
        ctx.body = await ctx.service.error.show({...ctx.query, id});
    }
}