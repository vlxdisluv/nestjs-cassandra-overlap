import { Injectable } from '@nestjs/common';

import { Inject } from '@nestjs/common';
import { Client, mapping } from 'cassandra-driver';
import {
  CassandraOverlapModuleOptions,
  CASSANDRA_OVERLAP_MODULE_OPTIONS_PROVIDER_NAME,
} from '../cassandra-overlap.types';

@Injectable()
export class CassandraOverlapService {
  client: Client;

  constructor(
    @Inject(CASSANDRA_OVERLAP_MODULE_OPTIONS_PROVIDER_NAME)
    private readonly options: CassandraOverlapModuleOptions,
  ) {
    this.client = new Client(this.options);

    this.client.execute('select * from messages limit 1');
  }

  createMapper(mappingOptions: mapping.MappingOptions) {
    const mapper = new mapping.Mapper(this.client, mappingOptions);
    mapper.batch = mapper.batch.bind(this);
    return mapper;
  }
}
