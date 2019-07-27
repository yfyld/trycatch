import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  HttpStatus,
  Query,
  Req,
  Delete,
  Param,
} from '@nestjs/common';
import { Project } from './project.model';
import { ProjectService } from './project.service';
import { HttpProcessor } from '@/decotators/http.decotator';
import { JwtAuthGuard } from '@/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Permissions } from '@/decotators/permissions.decotators';
import { PermissionsGuard } from '@/guards/permission.guard';
import { ProjectDto, AddProjectDto } from './project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('/')
  @HttpProcessor.handle({ message: '新建项目' })
  addProject(@Body() body: AddProjectDto,@Req() request: any): Promise<ProjectDto> {
    return this.projectService.addProject(body);
  }

  @HttpProcessor.handle('编辑项目')
  @Post('/:projectId')
  signup(
    @Param('projectId') projectId: number,
    @Body() body: Project,
  ): Promise<Project> {
    return this.projectService.updateProject(projectId, body);
  }

  @HttpProcessor.handle('删除项目')
  @Delete('/:projectId')
  signout(@Param('projectId') projectId: number): Promise<boolean> {
    return this.projectService.deleteProject(projectId);
  }

  @ApiBearerAuth()
  @HttpProcessor.handle('获取项目信息')
  @Get('/:projectId')
  @UseGuards(JwtAuthGuard)
  getProjectInfo(@Req() projectId: number): Promise<Project> {
    return this.projectService.getProjectById(projectId);
  }

  @ApiBearerAuth()
  @HttpProcessor.handle('获取项目列表')
  @UseGuards(JwtAuthGuard)
  @Get('/')
  getProjects(): Promise<Project[]> {
    return this.projectService.getProjects();
  }
}
