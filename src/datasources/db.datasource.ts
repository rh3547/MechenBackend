import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'db',
  connector: 'mysql',
  url: '', // mysql://admin:password@rhochmuth-dev.chjowozh0yh4.us-east-1.rds.amazonaws.com/mechen-dev
  host: 'rhochmuth-dev.chjowozh0yh4.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  password: '92ad2r8KBt',
  database: 'mechen-dev'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.db', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
