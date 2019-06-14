import { Application } from 'egg';

export default (app: Application) => {
  require('./router/user')(app);
  require('./router/project')(app);
  require('./router/log')(app);
  require('./router/error')(app);
};
