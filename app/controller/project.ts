import { Controller } from 'egg';


export default class ProjectController extends Controller {

    // 项目列表
    async index() {
        const { ctx } = this;
        const query = { ...ctx.query };
        query.page = ctx.helper.parseInt(query.page);
        query.pageSize = ctx.helper.parseInt(query.pageSize);
        ctx.body = await ctx.service.project.list(query);
    }

    // 创建项目
    async create() {
        const { ctx } = this;
        ctx.body = await ctx.service.project.create(ctx.request.body);
    }

    // 更新项目
    async update() {
        const { ctx } = this;
        const id = ctx.helper.parseInt(ctx.request.body.id);
        ctx.body = await ctx.service.project.update({...ctx.request.body, id});
    }

    // 项目详情
    async show() {
        const { ctx } = this;
        const id = ctx.helper.parseInt(ctx.params.id);
        ctx.body = await ctx.service.project.show(id);
    }

    // 删除项目
    async destroy() {
        const { ctx } = this;
        const id = ctx.helper.parseInt(ctx.params.id);
        ctx.body = await ctx.service.project.destroy(id);
    }
}