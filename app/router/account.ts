import { Application } from 'egg';

module.exports = (app: Application) => {
    const { router, controller } = app;
    const checkLogin = app.middleware.checkLogin();

    const prefix = '/account';

    router.get(prefix, checkLogin, controller.account.index);
    router.post(`${prefix}/register`, controller.account.register);
    router.post(`${prefix}/login`, controller.account.login);
    router.post(`${prefix}/logout`, controller.account.logout);

}