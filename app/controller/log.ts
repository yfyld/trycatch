import { Controller } from 'egg';

export default class LogController extends Controller {
    public async index() {
        const { ctx } = this;
        ctx.body = 'log';
    }
}