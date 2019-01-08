import { Application, Context } from 'egg';

module.exports = (options: object, app: Application) => {
    return async function(ctx: Context, next: () => Promise<any>) {
        const user = await ctx.session.currentUser;
        if (!user) {

        }
        console.log(options);
        console.log(app);
        await next();
    }
}