
import { Controller } from 'egg';
import * as _ from "lodash";

export default class UserController extends Controller {
    

    public async index() {
      const { ctx } = this;
      ctx.body = await ctx.service.user.sayHi('egg');
    }

    // 注册
    public async signup() {
      const { ctx } = this;
      const response = await ctx.service.user.signup(ctx.request.body);
      ctx.body = response;
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
      ctx.body = this.ctx.response.ServerResponse.success('OK', userInfo);
    }

    //获取用户列表
    public async list() {
      this.ctx.body = 'abcd';
    }

    //更新用户信息
    public async update() {
      this.ctx.body = 'update';
    }

    // 退出登录
    public async logout() {
      const { ctx } = this;
      ctx.session = null;
      ctx.body = this.ctx.response.ServerResponse.success('OK', '退出成功');
    }

  }