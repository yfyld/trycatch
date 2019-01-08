
import { Context } from 'egg';

export default (): any => {
    return async function(ctx: Context, next: () => Promise<any>) {
        const user = await ctx.session.currentUser;
        if (!user) {
            return ctx.body = ctx.response.ServerResponse.error('用户未登录', ctx.response.ResponseCode.NO_LOGIN);
        }
        
        await next();
    }
}