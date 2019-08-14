import { HttpBadRequestError } from './../../errors/bad-request.error';
import { ProjectModel, MemberModel } from './project.model';
import { Injectable } from '@nestjs/common';
import { Repository, In, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AddProjectDto,
  ProjectDto,
  UpdateMembersDto,
  QueryProjectsDto,
  UpdateProjectDto,
  AddProjectResDto,
} from './project.dto';
import { UserModel } from '@/modules/user/user.model';
import { QueryListResult, PageData } from '@/interfaces/request.interface';
import {
  UseInterceptors,
  ClassSerializerInterceptor,
} from '_@nestjs_common@6.3.1@@nestjs/common';
@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectModel)
    private readonly projectModel: Repository<ProjectModel>,
    @InjectRepository(UserModel)
    private readonly userModel: Repository<UserModel>,
    @InjectRepository(MemberModel)
    private readonly memberModel: Repository<MemberModel>,
  ) {}

  public getProjectById(projectId: number): Promise<ProjectModel> {
    return this.projectModel.findOne({
      where: { id: projectId },
      relations: ['creator', 'guarder'],
    });
  }

  public async getProjectInfo(projectId: number): Promise<ProjectDto> {
    const project = await this.getProjectById(projectId);
    const members = await this.memberModel.find({
      where: { id: projectId },
      relations: ['user', 'role'],
    });
    const result: ProjectDto = { ...project, members, sourcemap: [] };
    return result;
  }

  public async getProjects(
    query: QueryListResult<QueryProjectsDto>,
  ): Promise<PageData<ProjectModel>> {
    const [projects, totalCount] = await this.projectModel.findAndCount({
      skip: query.skip,
      take: query.take,
      where: {
        name: Like(`%${query.query.projectName}%`),
      },
    });
    return {
      totalCount,
      list: projects,
    };
  }

  public async addProject(
    projectInfo: AddProjectDto,
    user: UserModel,
  ): Promise<AddProjectResDto> {
    if (projectInfo.adminId) {
      projectInfo.admin = await this.userModel.findOne(projectInfo.adminId);
    } else {
      projectInfo.admin = user;
    }
    if (projectInfo.guarderId) {
      projectInfo.guarder = await this.userModel.findOne(projectInfo.guarderId);
    } else {
      projectInfo.guarder = user;
    }

    const project = this.projectModel.create(projectInfo);
    const { id } = await this.projectModel.save(project);
    return { id };
  }

  public async updateProject(
    projectInfo: UpdateProjectDto,
    projectId: number,
  ): Promise<void> {
    let project = await this.projectModel.findOne(projectId);
    project = { ...project, ...projectInfo };
    await this.projectModel.save(project);
    return;
  }

  public async deleteProject(projectId: number): Promise<void> {
    const project = await this.projectModel.findOne(projectId);
    await this.projectModel.remove(project);
    return;
  }

  public async addMembers(
    projectId: number,
    memberIds: number[],
  ): Promise<void> {
    const project = await this.projectModel.findOne({
      relations: ['members'],
      where: { id: projectId },
    });
    if (!project) {
      throw new HttpBadRequestError('项目不存在');
    }
    const members = await this.userModel.find({
      id: In(memberIds),
    });
    // project.members = project.members
    //   ? project.members.concat(members)
    //   : members;
    this.projectModel.save(project);
    return;
  }

  public async deleteMember(
    projectId: number,
    memberIds: number[],
  ): Promise<void> {
    const project = await this.projectModel.findOne({
      relations: ['members'],
      where: { id: projectId },
    });

    // project.members = project.members.filter(
    //   item => memberIds.findIndex(id => id === item.id) === -1,
    // );
    this.projectModel.save(project);
    return;
  }
}
