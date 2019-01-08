
import { Context } from 'egg';
// import ServerResponse from '../util/serverResponse';

export default () => {
    return async function(ctx: Context, next: () => Promise<any>) {
        // let response: typeof ServerResponse;
        // const user = await ctx.session.currentUser;
        // response = ctx.response.ServerResponse;
        // console.log(response);
        // if (!user) {
        //     return ctx.body = response.error('用户未登录', ctx.response.ResponseCode.NO_LOGIN);
        // }
        console.log(ctx);
        await next();
    }
}