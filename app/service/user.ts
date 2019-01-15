
import { Service } from 'egg';
import { Model } from 'sequelize';
import * as md5 from 'md5';
import { IUserModel } from '../model';
import ServerResponse from '../util/serverResponse';
// import { CServerResponse } from '../util/serverResponse';


export default class User extends Service {

  UserModel: Model<{}, {}>;
  ServerResponse: typeof ServerResponse;
  // ServerResponse: CServerResponse;
  constructor(ctx) {
    super(ctx);
    this.UserModel = ctx.model.User;
    this.ServerResponse = ctx.response.ServerResponse;
    
  }

 
  public async sayHi(name: string) {
    return `hi, ${name}`;
  }


  // 注册
  public async signup(user: IUserModel) {
    // 去重
    

    user.password = md5(user.password);
    
    const data = await this.UserModel.create(user);
    if (!data) {
      return this.ServerResponse.error('注册失败');
    } else {
      return this.ServerResponse.success('注册成功');
    }
    
  }

  // 登录
  public async login(data: object) {
    return this.ServerResponse.success('登录成功', data);
  }
}
