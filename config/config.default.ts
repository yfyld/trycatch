import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1546599568825_2502';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    
  };

  config.sequelize = {
    dialect: 'mysql',
    host: 'yfyld.online',
    port: 3333,
    database: 'trycatch',
    username: 'yfyld',
    password: '342531',
    define: {
      underscored: true
    }

  };
  config.security = {
    csrf: {
      enable: false
    }
  };
  config.redis = {
    client: {
      host: 'yfyld.online',
      port: 6666,
      password: '342531',
      db: 2
    }
  };

  config.session = {
    key: 'FUNDEBUG_SESS',
    maxAge: 24 * 3600 * 1000,
    httpOnly: true,
    encrypt: true
  };
  config.bodyParser = {
    enableTypes: ['json', 'form', 'text'],
    extendTypes: {
      text: ['text/xml', 'application/xml']
    }
  }
  config.cors = {
    origin: 'http://127.0.0.1:3000',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true
  }
  // the return config will combines to EggAppConfig
  return {
    ...bizConfig,
    ...config,
  };
};
