import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project, Sourcemap } from './project.model';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([Project, User, Sourcemap])],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService],
})
export class ProjectModule {}
