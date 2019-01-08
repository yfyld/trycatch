import { Application } from 'egg';

module.exports = (app: Application) => {
    const { router, controller } = app;
    

    const prefix = '/account';

    router.get(prefix, controller.account.index);
    router.post(`${prefix}/register`, controller.account.register);
    router.post(`${prefix}/login`, controller.account.login);

}