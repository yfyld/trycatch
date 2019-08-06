import { QueryListResult } from '@/interfaces/request.interface';
import { QueryList } from './../../decotators/query-list.decorators';
import { PageQuery, PageData } from './../../interfaces/request.interface';
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
  Put,
} from '@nestjs/common';
import { Project } from './project.model';
import { ProjectService } from './project.service';
import { HttpProcessor } from '@/decotators/http.decotator';
import { JwtAuthGuard } from '@/guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { Permissions } from '@/decotators/permissions.decotators';
import { PermissionsGuard } from '@/guards/permission.guard';
import {
  ProjectDto,
  AddProjectDto,
  AddMembersDto,
  DeleteMembersDto,
  UpdateMembersDto,
  QueryProjectsDto,
} from './project.dto';
import { Auth } from '@/decotators/user.decorators';
import { User } from '@/modules/user/user.model';
@ApiUseTags('项目相关')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({ title: '新建项目', description: '' })
  @Post('/')
  @HttpProcessor.handle({ message: '新建项目' })
  @UseGuards(JwtAuthGuard)
  addProject(
    @Body() body: AddProjectDto,
    @Auth() user: User,
  ): Promise<ProjectDto> {
    return this.projectService.addProject(body, user);
  }

  @ApiOperation({ title: '编辑项目', description: '' })
  @HttpProcessor.handle('编辑项目')
  @Put('/')
  updateProject(@Body() body: UpdateMembersDto): Promise<void> {
    return this.projectService.updateProject(body);
  }

  @ApiOperation({ title: '删除项目', description: '' })
  @HttpProcessor.handle('删除项目')
  @Delete('/:projectId')
  signout(@Param('projectId') projectId: number): Promise<void> {
    return this.projectService.deleteProject(projectId);
  }

  @ApiOperation({ title: '获取项目信息', description: '' })
  @ApiBearerAuth()
  @HttpProcessor.handle('获取项目信息')
  @Get('/:projectId')
  @UseGuards(JwtAuthGuard)
  getProjectInfo(@Param('projectId') projectId: number): Promise<Project> {
    return this.projectService.getProjectById(projectId);
  }

  @ApiOperation({ title: '获取项目列表', description: '' })
  @ApiBearerAuth()
  @HttpProcessor.handle('获取项目列表')
  @UseGuards(JwtAuthGuard)
  @Get('/')
  getProjects(
    @QueryList() query: QueryListResult<QueryProjectsDto>,
  ): Promise<PageData<Project>> {
    return this.projectService.getProjects(query);
  }

  @ApiOperation({ title: '添加成员', description: '' })
  @Post('/add-members')
  @HttpProcessor.handle({ message: '添加成员' })
  @UseGuards(JwtAuthGuard)
  addMembers(@Body() body: AddMembersDto): Promise<void> {
    return this.projectService.addMembers(body.projectId, body.memberIds);
  }

  @ApiOperation({ title: '删除成员', description: '' })
  @Post('/delete-member')
  @HttpProcessor.handle({ message: '删除成员' })
  @UseGuards(JwtAuthGuard)
  deleteMember(@Body() body: DeleteMembersDto): Promise<void> {
    return this.projectService.deleteMember(body.projectId, body.memberId);
  }
}
