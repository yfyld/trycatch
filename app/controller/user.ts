
import { Controller } from 'egg';
import * as _ from "lodash";

export default class UserController extends Controller {
    

  // 用户列表
  public async index() {
    const { ctx } = this;
    const query = { ...ctx.query };
    query.page = ctx.helper.parseInt(query.page);
    query.pageSize = ctx.helper.parseInt(query.pageSize);
    ctx.body = await ctx.service.user.list(query);
    
  }

  // 注册
  public async signup() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.signup(ctx.request.body);
  }


  // 登录
  public async login() {
    const { ctx } = this;
    const response = await ctx.service.user.login(ctx.request.body);
    
    if (response.isSuccess()) {
      ctx.session.currentUser = response.getData();
    }
    ctx.body = response;
  }

  // 获取当前登录用户信息
  public async info() {
    const { ctx } = this;
    const userInfo = ctx.session.currentUser;
    _.unset(userInfo, 'password');
    ctx.body = ctx.response.ServerResponse.success('OK', userInfo);
  }


  //更新用户信息
  public async update() {
    const { ctx } = this;
    const id = ctx.helper.parseInt(ctx.request.body.id);
    ctx.body = await ctx.service.user.update({...ctx.request.body, id});
  }

  // 退出登录
  public async logout() {
    const { ctx } = this;
    ctx.session = null;
    ctx.body = ctx.response.ServerResponse.success('OK', '退出成功');
  }

  // 删除用户
  public async destroy() {
    const { ctx } = this;
    const id = ctx.helper.parseInt(ctx.params.id);
    ctx.body = await ctx.service.user.destroy(id);
  }
    
  }