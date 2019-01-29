import { Application } from 'egg';

module.exports = (app: Application) => {
    const { router, controller } = app;

    const prefix = '/error';

    router.get(`${prefix}/stat`, controller.error.stat);
    router.resources('error', prefix, controller.error);
    
    

}