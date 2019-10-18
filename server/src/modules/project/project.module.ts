import { RedisModule } from './../../providers/redis/redis.module';
import { RoleModel } from './../user/user.model';
import { Module, HttpModule } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ProjectModel, SourcemapModel, MemberModel } from './project.model';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from '../user/user.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectModel,
      UserModel,
      RoleModel,
      SourcemapModel,
      MemberModel
    ]),
    HttpModule,
    RedisModule
  ],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService]
})
export class ProjectModule {}
