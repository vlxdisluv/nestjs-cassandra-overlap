import { ModuleMetadata, Type } from '@nestjs/common';
import { DseClientOptions } from 'cassandra-driver';

export const CASSANDRA_OVERLAP_MODULE_OPTIONS_PROVIDER_NAME =
  'CASSANDRA_OVERLAP_MODULE_OPTIONS';

export declare type CassandraOverlapModuleOptions = DseClientOptions;

export interface CasandraOverlapOptionsFactory {
  createCassandraOverlapOptions():
    | Promise<CassandraOverlapModuleOptions>
    | CassandraOverlapModuleOptions;
}

export interface CassandraOverlapModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (
    ...args: any[]
  ) => Promise<CassandraOverlapModuleOptions> | CassandraOverlapModuleOptions;
  useClass?: Type<CasandraOverlapOptionsFactory>;
  inject?: any[];
}
