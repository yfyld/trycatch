import { Application } from 'egg';

module.exports = (app: Application) => {
    const { router, controller } = app;

    const prefix = '/log';

    router.resources('log', prefix, controller.log);
    
    

}