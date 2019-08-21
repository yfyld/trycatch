import { RoleModel } from './../user/user.model';
import { HttpBadRequestError } from './../../errors/bad-request.error';
import { ProjectModel, MemberModel, SourcemapModel } from './project.model';
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
  AddMembersDto,
  DeleteMembersDto,
  AddSourcemapsDto,
  ActionSourcemapsDto,
} from './project.dto';
import { UserModel } from '@/modules/user/user.model';
import { QueryListQuery, PageData } from '@/interfaces/request.interface';
import { UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectModel)
    private readonly projectModel: Repository<ProjectModel>,
    @InjectRepository(UserModel)
    private readonly userModel: Repository<UserModel>,
    @InjectRepository(RoleModel)
    private readonly roleModel: Repository<RoleModel>,
    @InjectRepository(MemberModel)
    private readonly memberModel: Repository<MemberModel>,
    @InjectRepository(SourcemapModel)
    private readonly sourcemapModel: Repository<SourcemapModel>,
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
      where: { project: { id: projectId } },
      relations: ['user', 'role'],
    });
    const sourcemap = await this.sourcemapModel.find({
      where: { project },
    });
    const result: ProjectDto = {
      ...project,
      members: members.map(item => ({
        ...item.user,
        roleCode: item.role && item.role.code,
      })),
      sourcemap,
    };
    return result;
  }

  public async getProjects(
    query: QueryListQuery<QueryProjectsDto>,
  ): Promise<PageData<ProjectModel>> {
    const [projects, totalCount] = await this.projectModel.findAndCount({
      skip: query.skip,
      take: query.take,
      where: {
        name: Like(`%${query.query.projectName || ''}%`),
      },
      relations: ['creator'],
    });
    return {
      totalCount,
      list: projects,
    };
  }

  public async getMyProjects(user: UserModel): Promise<any> {
    const projects = await this.memberModel.find({
      where: { user },
      relations: ['project', 'role'],
    });
    return {
      list: projects.map(item => ({
        name: item.project.name,
        id: item.project.id,
        role: item.role.code,
      })),
    };
  }

  public async addProject(
    projectInfo: AddProjectDto,
    user: UserModel,
  ): Promise<AddProjectResDto> {
    const project = this.projectModel.create({
      creator: user,
      guarder: { id: projectInfo.guarderId || user.id },
      ...projectInfo,
    });
    const { id } = await this.projectModel.save(project);
    await this.addMembers({
      projectId: id,
      memberIds: [project.guarder.id],
      roleCode: 'ADMIN',
    });
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

  public async addMembers(body: AddMembersDto): Promise<void> {
    const { memberIds, projectId, roleCode } = body;
    const role = await this.roleModel.findOne({ code: roleCode });
    if (!role) {
      throw new HttpBadRequestError('角色不存在');
    }
    const project = await this.projectModel.findOne(projectId);
    if (!project) {
      throw new HttpBadRequestError('项目不存在');
    }
    const members = await this.userModel.find({
      id: In(memberIds),
    });
    await this.memberModel
      .createQueryBuilder()
      .insert()
      .values(members.map(user => ({ role, project, user })))
      .execute();
    return;
  }

  public async deleteMember(body: DeleteMembersDto): Promise<void> {
    const { projectId, memberIds } = body;

    await this.memberModel
      .createQueryBuilder('member')
      .delete()
      .where('project = :projectId AND userId IN (:...memberIds) ', {
        projectId,
        memberIds,
      })
      .execute();
    return;
  }

  public async updateMember(body: UpdateMembersDto): Promise<void> {
    const { projectId, memberIds, roleCode } = body;
    const role = await this.roleModel.findOne({ code: roleCode });
    if (!role) {
      throw new HttpBadRequestError('角色不存在');
    }
    await this.memberModel
      .createQueryBuilder('member')
      .update()
      .set({ role })
      .where('projectId = :projectId AND userId IN (:...memberIds) ', {
        projectId,
        memberIds,
      })
      .execute();
    return;
  }

  public async addSourcemap(body: AddSourcemapsDto): Promise<void> {
    const { projectId, files, hash, version } = body;

    await this.sourcemapModel
      .createQueryBuilder('source')
      .insert()
      .values(
        files.map(file => ({
          project: { id: projectId },
          hash,
          version,
          ...file,
        })),
      )
      .execute();
    return;
  }

  public async updateSourcemap(body: ActionSourcemapsDto): Promise<void> {
    const { projectId, sourcemapIds, hash, version } = body;

    await this.sourcemapModel
      .createQueryBuilder('member')
      .update()
      .set({ hash, version })
      .where('projectId = :projectId AND id IN (:...sourcemapIds) ', {
        projectId,
        sourcemapIds,
      })
      .execute();
    return;
  }

  public async deleteSourcemap(body: ActionSourcemapsDto): Promise<void> {
    const { projectId, sourcemapIds } = body;

    await this.sourcemapModel
      .createQueryBuilder('member')
      .delete()
      .where('projectId = :projectId AND id IN (:...sourcemapIds) ', {
        projectId,
        sourcemapIds,
      })
      .execute();
    return;
  }
}
