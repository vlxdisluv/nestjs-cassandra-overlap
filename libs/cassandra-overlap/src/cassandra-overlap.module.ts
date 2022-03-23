import { DynamicModule, Module, Provider, Type } from '@nestjs/common';

import {
  CASSANDRA_OVERLAP_MODULE_OPTIONS_PROVIDER_NAME,
  CasandraOverlapOptionsFactory,
  CassandraOverlapModuleAsyncOptions,
} from './cassandra-overlap.types';
import { CassandraOverlapService } from './services';

@Module({})
export class CassandraOverlapModule {
  static defaultOptions = {
    contactPoints: ['127.0.0.1:9042'],
    localDataCenter: 'DC1',
    keyspace: 'scylla',
    monitorReporting: { enabled: true },
  };

  static forRootAsync(
    options: CassandraOverlapModuleAsyncOptions,
  ): DynamicModule {
    console.log('options', options);
    const asyncProviders = this.createAsyncProviders(options);
    return {
      module: CassandraOverlapModule,
      imports: options.imports,
      providers: [...asyncProviders, CassandraOverlapService],
      exports: [CassandraOverlapService],
    };
  }

  private static createAsyncProviders(
    options: CassandraOverlapModuleAsyncOptions,
  ): Provider[] {
    if (options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass as Type<CasandraOverlapOptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: CassandraOverlapModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: CASSANDRA_OVERLAP_MODULE_OPTIONS_PROVIDER_NAME,
        useFactory: {
          ...CassandraOverlapModule.defaultOptions,
          ...options.useFactory,
        } as any,
        inject: options.inject || [],
      };
    }

    const inject = [options.useClass as Type<CasandraOverlapOptionsFactory>];

    return {
      provide: CASSANDRA_OVERLAP_MODULE_OPTIONS_PROVIDER_NAME,
      useFactory: async (optionsFactory: CasandraOverlapOptionsFactory) => {
        const options = await optionsFactory.createCassandraOverlapOptions();
        return { ...CassandraOverlapModule.defaultOptions, ...options };
      },
      inject,
    };
  }
}
