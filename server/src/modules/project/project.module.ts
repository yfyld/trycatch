import { Module } from '@nestjs/common';
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
      SourcemapModel,
      MemberModel,
    ]),
  ],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService],
})
export class ProjectModule {}
