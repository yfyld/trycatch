import { Controller } from 'egg';
import * as _ from "lodash";

export default class HomeController extends Controller {
    
    public async index() {
      const { ctx } = this;
      ctx.body = await ctx.service.account.sayHi('egg');
    }

    // 注册
    public async register() {
      const { ctx } = this;
      ctx.body = await ctx.service.account.register(ctx.request.body);
    }


    // 登录
    public async login() {
      const { ctx } = this;
      ctx.body = await ctx.service.account.login(ctx.request.body);
    }

    // 获取用户信息
    public async getInfo() {
      const { ctx } = this;
      const accountInfo = ctx.session.currentUser;
      _.unset(accountInfo, 'password');
      ctx.body = ctx.response.ServerResponse.success('OK', accountInfo);
    }

  }