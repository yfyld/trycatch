import { Application } from 'egg';

module.exports = (app: Application) => {
    const { router, controller } = app;
    const checkLogin = app.middleware.checkLogin();

    const prefix = '/user';

    router.get(prefix, checkLogin, controller.user.index);
    router.post(`${prefix}/signup`, controller.user.signup);
    router.post(`${prefix}/login`, controller.user.login);
    router.post(`${prefix}/logout`, controller.user.logout);

}