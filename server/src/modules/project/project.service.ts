import { Project } from './project.model';
import { Injectable } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AddProjectDto,
  ProjectDto,
  UpdateMembersDto,
  QueryProjectsDto,
} from './project.dto';
import { User } from '@/modules/user/user.model';
import { QueryListResult, PageData } from '@/interfaces/request.interface';
@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectModel: Repository<Project>,
    @InjectRepository(User)
    private readonly userModel: Repository<User>,
  ) {}

  public getProjectById(projectId: number): Promise<Project> {
    return this.projectModel.findOne({
      where: { id: projectId },
      relations: ['admin', 'members'],
    });
  }

  public async getProjects(
    query: QueryListResult<QueryProjectsDto>,
  ): Promise<PageData<Project>> {
    const [projects, totalCount] = await this.projectModel.findAndCount({
      skip: query.skip,
      take: query.take,
      where: {
        ...query.query,
      },
    });
    return {
      totalCount,
      list: projects,
    };
  }

  public async addProject(
    projectInfo: AddProjectDto,
    user: User,
  ): Promise<ProjectDto> {
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

  public async updateProject(projectInfo: UpdateMembersDto): Promise<void> {
    let project = await this.projectModel.findOne(projectInfo.id);
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
    const members = await this.userModel.find({
      id: In(memberIds),
    });
    project.members = project.members
      ? project.members.concat(members)
      : members;
    this.projectModel.save(project);
    return;
  }

  public async deleteMember(
    projectId: number,
    memberId: number,
  ): Promise<void> {
    const project = await this.projectModel.findOne({
      relations: ['members'],
      where: { id: projectId },
    });

    project.members = project.members.filter(item => item.id !== memberId);
    this.projectModel.save(project);
    return;
  }
}
