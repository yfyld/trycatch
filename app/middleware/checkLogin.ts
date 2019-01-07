import { Application, Context } from 'egg';

module.exports = (options, app: Application) => {
    return async function(ctx: Context, next: () => Promise<any>) {
        const user = await ctx.session.currentUser;
        if (!user) {

        }
        await next();
    }
}