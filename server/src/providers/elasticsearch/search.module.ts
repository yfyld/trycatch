import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';

@Module({
  imports: [
    ElasticsearchModule.register({
      host: '127.0.0.1:9600',
      log: 'trace',
    }),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
