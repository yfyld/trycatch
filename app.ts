import { IBoot, Application } from 'egg';

export default class AppBoot implements IBoot {
    private readonly app: Application
    constructor(app: Application) {
        this.app = app;
        
    }

    configWillLoad() {
        const app = this.app;
        app.beforeStart(async function() {
            //await app.model.sync({force:true});
        })
    }
  
}