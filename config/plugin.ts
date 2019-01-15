import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  },
  sessionRedis: {
    enable: true,
    package: 'egg-session-redis'
  },
  redis: {
    enable: true,
    package: 'egg-redis'
  },
  validate: {
    enable: true,
    package: 'egg-validate'
  },
  cors: {
    enable: true,
    package: 'egg-cors'
  }
};

export default plugin;
