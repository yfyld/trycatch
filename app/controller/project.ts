import { Controller } from 'egg';


export default class ProjectController extends Controller {

    // 项目列表
    async index() {
        const { ctx } = this;
        const query = { ...ctx.query };
        const user = ctx.session.currentUser || {};
        query.page = ctx.helper.parseInt(query.page)||1;
        query.pageSize = ctx.helper.parseInt(query.pageSize)||20;
        ctx.body = await ctx.service.project.list(query, user.id);
    }

    // 创建项目
    async create() {
        const { ctx } = this;
        ctx.body = await ctx.service.project.create(ctx.request.body);
    }

    // 更新项目
    async update() {
        const { ctx } = this;
        const id = ctx.helper.parseInt(ctx.params.id);
        ctx.body = await ctx.service.project.update(id,ctx.request.body);
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

    // 添加项目成员
    async addMember() {
        const { ctx } = this;
        const id = ctx.helper.parseInt(ctx.params.id);
        ctx.body = await ctx.service.project.addMember(ctx.request.body, id);
    }

    async deleteMember() {
        const { ctx } = this;
        const id = ctx.helper.parseInt(ctx.params.id);
        ctx.body = await ctx.service.project.deleteMember(ctx.request.body, id);
    }

    async members() {
        const { ctx } = this;
        const id = ctx.helper.parseInt(ctx.params.id);
        ctx.body = await ctx.service.project.members(id);
    }

    
}