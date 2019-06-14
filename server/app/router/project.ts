import { Application } from 'egg';

module.exports = (app: Application) => {
    const { router, controller } = app;
    const checkLogin = app.middleware.checkLogin();

    const prefix = '/project';

    router.post(`${prefix}/:id/addMember`, controller.project.addMember);
    router.delete(`${prefix}/:id/deleteMember`, controller.project.deleteMember);
    router.get(`${prefix}/:id/members`, controller.project.members);
    
    router.resources('project', prefix, checkLogin, controller.project);
    
    

}