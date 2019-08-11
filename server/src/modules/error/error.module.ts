import { Module, HttpModule } from '@nestjs/common';
import { ErrorController } from './error.controller';
import { ErrorService } from './error.service';
import { ErrorType } from './error.model';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.model';
import { Sourcemap } from '../project/project.model';
import { RedisModule } from 'nestjs-redis';
@Module({
  imports: [
    TypeOrmModule.forFeature([ErrorType, User, Sourcemap]),
    HttpModule,
    RedisModule.register({
      host: '127.0.0.1',
      port: 6666,
      db: 3,
    }),
  ],
  providers: [ErrorService],
  controllers: [ErrorController],
  exports: [ErrorService],
})
export class ErrorModule {}
