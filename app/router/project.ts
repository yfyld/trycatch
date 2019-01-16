import { Application } from 'egg';

module.exports = (app: Application) => {
    const { router, controller } = app;

    const prefix = '/project';

    router.resources('project', prefix, controller.project);
    
    

}