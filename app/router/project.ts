import { Application } from 'egg';

module.exports = (app: Application) => {
    const { router, controller } = app;
    const checkLogin = app.middleware.checkLogin();

    const prefix = '/project';

    router.resources('project', prefix, checkLogin, controller.project);
    
    

}