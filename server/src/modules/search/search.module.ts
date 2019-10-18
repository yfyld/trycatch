import { BullQueueModule } from './../../providers/bull-queue/bull-queue.module';
import { EsModule } from './../../providers/es/es.module';
import { ErrorModel } from './../error/error.model';
import { ProjectModule } from './../project/project.module';

import { SearchQueue } from './search.queue';
import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchSchedule } from './search.schedule';
import { ProjectModel } from '../project/project.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([ErrorModel, ProjectModel]),
    EsModule,
    BullQueueModule,
    ProjectModule,
  ],
  controllers: [SearchController],
  providers: [SearchService, SearchQueue, SearchSchedule],
  exports: [SearchService],
})
export class SearchModule {}
