import { Service } from 'egg';

export default class Log extends Service {
    async list(data: object) {
        console.log(data);
        return 'abcd';
    }
}