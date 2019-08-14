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
  ],
  providers: [ErrorService, ErrorSchedule],
  controllers: [ErrorController],
  exports: [ErrorService],
})
export class ErrorModule {}
