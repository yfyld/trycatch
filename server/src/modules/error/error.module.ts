import { RedisModule } from './../../providers/redis/redis.module';
import { BullQueueModule } from './../../providers/bull-queue/bull-queue.module';

import { SearchService } from './../search/search.service';
import { BullModule } from 'nest-bull';
import { ErrorSchedule } from './error.schedule';
import { Module, HttpModule } from '@nestjs/common';
import { ErrorController } from './error.controller';
import { ErrorService } from './error.service';
import { ErrorModel } from './error.model';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from '../user/user.model';
import { SourcemapModel, ProjectModel } from '../project/project.model';

import { ScheduleModule } from 'nest-schedule';
import { ErrorQueue } from './error.queue';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ErrorModel,
      UserModel,
      SourcemapModel,
      ProjectModel,
    ]),
    ScheduleModule.register(),
    HttpModule,
    RedisModule,
    BullQueueModule,
  ],
  providers: [ErrorService, ErrorSchedule, ErrorQueue],
  controllers: [ErrorController],
  exports: [ErrorService],
})
export class ErrorModule {}
