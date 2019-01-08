
import { Service } from 'egg';
import { Model } from 'sequelize';
import ServerResponse from '../util/serverResponse';


// import * as md5 from 'md5';
export default class Account extends Service {

  AccountModel: Model<{}, {}>;
  ServerResponse: typeof ServerResponse;
  constructor(ctx) {
    super(ctx);
    // this.AccountModel = ctx.model.Account;
    this.ServerResponse = ctx.response.ServerResponse;
    
  }

 
  public async sayHi(name: string) {
    return `hi, ${name}`;
  }


  // 注册
  public async register(account) {
    // return `hi, ${data}`;
    // account.password = md5(account.password);
    // account = await this.AccountModel.create(account);
    if (!account) {
      return this.ServerResponse.error('注册失败');
    }
    
    return 'hi';
  }

  // 登录
  public async login(data: object) {
    return `hi, ${data}`;
  }
}
