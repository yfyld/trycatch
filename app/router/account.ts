import { Application } from 'egg';

module.exports = (app: Application) => {
    const { router, controller } = app;
    

    const prefix = '/account';

    router.get(prefix, controller.account.index);

}