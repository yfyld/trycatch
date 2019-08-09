import { Module } from '@nestjs/common';
import { ErrorController } from './error.controller';
import { ErrorService } from './error.service';
import { ErrorType } from './error.model';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([ErrorType, User])],
  providers: [ErrorService],
  controllers: [ErrorController],
  exports: [ErrorService],
})
export class ErrorModule {}
