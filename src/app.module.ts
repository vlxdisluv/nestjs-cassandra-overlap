import { CassandraOverlapModule } from '@app/cassandra-overlap';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CassandraOverlapConfigService } from './services/cassandra-overlap-config.service';

@Module({
  imports: [
    CassandraOverlapModule.forRootAsync({
      useClass: CassandraOverlapConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
