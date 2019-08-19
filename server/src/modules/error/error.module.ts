import { BullModule } from 'nest-bull';
import { ErrorSchedule } from './error.schedule';
import { Module, HttpModule } from '@nestjs/common';
import { ErrorController } from './error.controller';
import { ErrorService } from './error.service';
import { ErrorModel } from './error.model';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from '../user/user.model';
import { SourcemapModel, ProjectModel } from '../project/project.model';
import { RedisModule } from 'nestjs-redis';
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
    HttpModule,
    RedisModule.register({
      host: '127.0.0.1',
      port: 6666,
      db: 3,
    }),
    ScheduleModule.register(),
    BullModule.forRoot({
      //name: 'store',
      options: {
        redis: {
          host: '127.0.0.1',
          port: 6666,
          password: '342531',
          db: 1,
        },
      },
      processors: [],
    }),
  ],
  providers: [ErrorService, ErrorSchedule, ErrorQueue],
  controllers: [ErrorController],
  exports: [ErrorService],
})
export class ErrorModule {}
