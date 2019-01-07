import { Service } from 'egg';


export default class Account extends Service {

 
  public async sayHi(name: string) {
    return `hi, ${name}`;
  }
}
