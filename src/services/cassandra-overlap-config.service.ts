import { Injectable } from '@nestjs/common';
import {
  CasandraOverlapOptionsFactory,
  CassandraOverlapModuleOptions,
} from '@app/cassandra-overlap';

@Injectable()
export class CassandraOverlapConfigService
  implements CasandraOverlapOptionsFactory
{
  createCassandraOverlapOptions(): CassandraOverlapModuleOptions {
    return {
      contactPoints: ['127.0.0.1:9042'],
      localDataCenter: 'DC1',
      keyspace: 'scylla',
      monitorReporting: { enabled: true },
    };
  }
}
