
import { Service } from 'egg';
import { Model } from 'sequelize';
import ServerResponse from '../util/serverResponse';


// import * as md5 from 'md5';
export default class User extends Service {

  UserModel: Model<{}, {}>;
  ServerResponse: typeof ServerResponse;
  constructor(ctx) {
    super(ctx);
    // this.UserModel = ctx.model.User;
    this.ServerResponse = ctx.response.ServerResponse;
    
  }

 
  public async sayHi(name: string) {
    return `hi, ${name}`;
  }


  // 注册
  public async signup(user) {
    // return `hi, ${data}`;
    // user.password = md5(User.password);
    // user = await this.UserModel.create(user);
    if (!user) {
      return this.ServerResponse.error('注册失败');
    }
    
    return 'hi';
  }

  // 登录
  public async login(data: object) {
    return this.ServerResponse.success('登录成功', data);
  }
}
