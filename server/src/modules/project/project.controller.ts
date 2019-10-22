import { ISourceCode } from './../../interfaces/common.interface';
import { ParseIntPipe } from './../../pipes/parse-int.pipe';
import { QueryListQuery } from '@/interfaces/request.interface';
import { QueryList } from './../../decotators/query-list.decorators';
import { PageQuery, IPageData } from './../../interfaces/request.interface';
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
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ProjectModel, SourcemapModel } from './project.model';
import { ProjectService } from './project.service';
import { HttpProcessor } from '@/decotators/http.decotator';
import { JwtAuthGuard } from '@/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiUseTags,
  ApiResponse,
} from '@nestjs/swagger';
import { Permissions } from '@/decotators/permissions.decotators';
import { PermissionsGuard } from '@/guards/permission.guard';
import {
  ProjectDto,
  AddProjectDto,
  AddMembersDto,
  DeleteMembersDto,
  UpdateMembersDto,
  QueryProjectsDto,
  UpdateProjectDto,
  AddProjectResDto,
  AddSourcemapsDto,
  ActionSourcemapsDto,
  ParseSourcemapDto,
  QuerySourcemapsDto,
} from './project.dto';
import { Auth } from '@/decotators/user.decorators';
import { UserModel } from '@/modules/user/user.model';

@ApiUseTags('项目相关')
@Controller('project')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({ title: '新建项目', description: '' })
  @ApiResponse({ status: 200, type: ProjectDto })
  @Post('/')
  @HttpProcessor.handle({ message: '新建项目' })
  // @UseGuards(JwtAuthGuard)
  addProject(
    @Body() body: AddProjectDto,
    @Auth() user: UserModel,
  ): Promise<AddProjectResDto> {
    return this.projectService.addProject(body, user);
  }

  @ApiOperation({ title: '编辑项目', description: '' })
  @HttpProcessor.handle('编辑项目')
  @Put('/:projectId')
  // @UseGuards(JwtAuthGuard)
  updateProject(
    @Body() body: UpdateProjectDto,
    @Param('projectId', new ParseIntPipe()) projectId: number,
  ): Promise<void> {
    return this.projectService.updateProject(body, projectId);
  }

  @ApiOperation({ title: '删除项目', description: '' })
  @HttpProcessor.handle('删除项目')
  @Delete('/:projectId')
  // @UseGuards(JwtAuthGuard)
  deleteProject(
    @Param('projectId', new ParseIntPipe()) projectId: number,
  ): Promise<void> {
    return this.projectService.deleteProject(projectId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ title: '获取项目信息', description: '' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: ProjectModel })
  @HttpProcessor.handle('获取项目信息')
  @Get('/info')
  // @UseGuards(JwtAuthGuard)
  getProjectInfo(
    @Query('projectId', new ParseIntPipe()) projectId: number,
  ): Promise<ProjectDto> {
    return this.projectService.getProjectInfo(projectId);
  }

  @ApiOperation({ title: '获取项目列表', description: '' })
  @ApiBearerAuth()
  @HttpProcessor.handle('获取项目列表')
  // @UseGuards(JwtAuthGuard)
  @Get('/')
  getProjects(
    @QueryList() query: QueryListQuery<QueryProjectsDto>,
  ): Promise<IPageData<ProjectModel>> {
    return this.projectService.getProjects(query);
  }

  @ApiOperation({ title: '获取所有相关项目', description: '' })
  @ApiBearerAuth()
  @HttpProcessor.handle('获取所有相关项目')
  // @UseGuards(JwtAuthGuard)
  @Get('/all')
  getMyProjects(@Auth() user: UserModel): Promise<IPageData<ProjectModel>> {
    return this.projectService.getMyProjects(user);
  }

  @ApiOperation({ title: '添加成员', description: '' })
  @Post('/add-members')
  @HttpProcessor.handle({ message: '添加成员' })
  // @UseGuards(JwtAuthGuard)
  addMembers(@Body() body: AddMembersDto): Promise<void> {
    return this.projectService.addMembers(body);
  }

  @ApiOperation({ title: '删除成员', description: '' })
  @Post('/delete-members')
  @HttpProcessor.handle({ message: '删除成员' })
  // @UseGuards(JwtAuthGuard)
  deleteMember(@Body() body: DeleteMembersDto): Promise<void> {
    return this.projectService.deleteMember(body);
  }

  @ApiOperation({ title: '编辑成员', description: '' })
  @Post('/update-members')
  @HttpProcessor.handle({ message: '编辑成员' })
  updateMember(@Body() body: UpdateMembersDto): Promise<void> {
    return this.projectService.updateMember(body);
  }


  @ApiOperation({ title: '获取sourcemap列表', description: '' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: SourcemapModel })
  @HttpProcessor.handle('获取sourcemap列表')
  @Get('/sourcemap')
  @UseGuards(JwtAuthGuard)
  getSourcemaps(
    @QueryList() query: QueryListQuery<QuerySourcemapsDto>,
  ): Promise<IPageData<SourcemapModel>> {
    return this.projectService.getSourcemaps(query);
  }

  @ApiOperation({ title: '添加sourcemap', description: '' })
  @Post('/sourcemap')
  @HttpProcessor.handle({ message: '添加sourcemap' })
  // @UseGuards(JwtAuthGuard)
  addSourcemap(@Body() body: AddSourcemapsDto): Promise<void> {
    return this.projectService.addSourcemap(body);
  }

  @ApiOperation({ title: '批量操作sourcemap', description: '' })
  @Put('/sourcemap/action')
  @HttpProcessor.handle({ message: '批量操作sourcemap' })
  // @UseGuards(JwtAuthGuard)
  actionSourcemap(@Body() body: ActionSourcemapsDto): Promise<void> {
    if (body.actionType === 'DELETE') {
      return this.projectService.deleteSourcemap(body);
    } else {
      return this.projectService.updateSourcemap(body);
    }
  }


  @ApiOperation({ title: '解析sourcemap', description: '' })
  @Post('/parse-sourcemap')
  @HttpProcessor.handle({ message: '解析sourcemap' })
  @UseGuards(JwtAuthGuard)
  parseSourcemap(@Body() {projectId,stack,version}: ParseSourcemapDto): Promise<ISourceCode> {
    return this.projectService.getSourceCode(stack,projectId,version);
  }
}