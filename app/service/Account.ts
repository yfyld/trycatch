import { Service } from 'egg';


export default class Account extends Service {

 
  public async sayHi(name: string) {
    return `hi, ${name}`;
  }


  // 注册
  public async register(data: object) {
    return `hi, ${data}`;
  }

  // 登录
  public async login(data: object) {
    return `hi, ${data}`;
  }
}
