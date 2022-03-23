import { Test, TestingModule } from '@nestjs/testing';
import { CassandraOverlapService } from './cassandra-overlap.service';

describe('CassandraOverlapService', () => {
  let service: CassandraOverlapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CassandraOverlapService],
    }).compile();

    service = module.get<CassandraOverlapService>(CassandraOverlapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
