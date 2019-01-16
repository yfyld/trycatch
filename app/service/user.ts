import { Service } from 'egg';
import { Model, Instance } from 'sequelize';
import * as md5 from 'md5';
import * as _ from 'lodash';
import { IUserModel } from '../model';
import ServerResponse from '../util/serverResponse';
// import { CServerResponse } from '../util/serverResponse';


export default class User extends Service {

  UserModel: Model<Instance<{}>, {}>;
  ServerResponse: typeof ServerResponse;
  // ServerResponse: CServerResponse;
  constructor(ctx) {
    super(ctx);
    this.UserModel = ctx.model.User;
    this.ServerResponse = ctx.response.ServerResponse;
    
  }

  async _checkExistByField(field: string, value: string) {
    const data = await this.UserModel.findOne({
      where: {
        [field]: value
      }
    });
    return !!data;
  }

  // 用户列表
  public async list({page = 1, pageSize = 10}) {
    const data = await this.UserModel.findAndCountAll({
      attributes: ['id', 'name', 'mobile'],
      offset: (page - 1) * pageSize,
      limit: pageSize,
      // order: ['id']
    })
    if (data) {
      return this.ServerResponse.success('查询成功', { totalCount: data.count || 0, list: data.rows || [] });
    } else {
      return this.ServerResponse.error('查询失败');
    }
  }

  // 注册
  public async signup(user: IUserModel) {
    if (await this._checkExistByField('mobile', user.mobile)) {
      return this.ServerResponse.error('手机号已存在');
    }

    user.password = md5(user.password);
    
    const data = await this.UserModel.create(user);
    if (!data) {
      return this.ServerResponse.error('注册失败');
    } else {
      return this.ServerResponse.success('注册成功');
    }
    
  }

  // 登录
  public async login({mobile, password}: IUserModel) {
    if (! await this._checkExistByField('mobile', mobile)) {
      console.log('--------------------------------');
      return this.ServerResponse.error('手机号不存在');
    }
    const data = await this.UserModel.findOne({
      where: {
        mobile: mobile,
        password: md5(password)
      }
    })
    if (!data) {
      return this.ServerResponse.error('密码错误');
    } else {
      _.unset(data, 'password');
      return this.ServerResponse.success('登录成功', data);
    }
    
  }

  // 删除
  public async destroy(id: string) {
    const [err, user] = await this.ctx.helper.awaitWrapper(this.UserModel.findById(id));
    if (err) {
      return this.ServerResponse.error('内部错误');
    } else {
      if (user) {
        await user.destroy();
        return this.ServerResponse.success('删除成功');
      } else {
        return this.ServerResponse.error('用户不存在');
      }
    }
    
  }


  // 更新
  public async update({id, ...updates}: IUserModel) {
    const user = await this.UserModel.findById(id);
    if (user) {
      user.update(updates);
    } else {
      return this.ServerResponse.error('用户不存在');
    }
  }
}
