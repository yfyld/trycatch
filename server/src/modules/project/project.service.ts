import { IStack, ISourceCode } from './../../interfaces/common.interface';
import { RedisService } from 'nestjs-redis';

import { RoleModel } from './../user/user.model';
import { HttpBadRequestError } from './../../errors/bad-request.error';
import { ProjectModel, MemberModel, SourcemapModel } from './project.model';
import { Injectable, HttpService } from '@nestjs/common';
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
  QuerySourcemapsDto,
} from './project.dto';
import { UserModel } from '@/modules/user/user.model';
import { QueryListQuery, IPageData } from '@/interfaces/request.interface';
import * as SourceMap from 'source-map';
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
    private readonly httpService: HttpService,
    private readonly redisService: RedisService
  ) {}

  public getProjectById(projectId: number): Promise<ProjectModel> {
    return this.projectModel.findOne({
      where: { id: projectId },
      relations: ['creator', 'guarder'],
    });
  }

  /**
   *查询项目信息
   *
   * @param {number} projectId
   * @returns {Promise<ProjectDto>}
   * @memberof ProjectService
   */
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


  /**
   *根据项目名称查询项目列表
   *带分页
   * 
   * @param {QueryListQuery<QueryProjectsDto>} query
   * @returns {Promise<IPageData<ProjectModel>>}
   * @memberof ProjectService
   */
  public async getProjects(
    query: QueryListQuery<QueryProjectsDto>
  ): Promise<IPageData<ProjectModel>> {
    const [projects, totalCount] = await this.projectModel.findAndCount({
      skip: query.skip,
      take: query.take,
      where: {
        name: Like(`%${query.query.projectName || ''}%`),
      },
      relations: ['creator', 'guarder'],
    });
    return {
      totalCount,
      list: projects,
    };
  }


/**
 *获取sourcemap列表
 *
 * @param {QueryListQuery<QuerySourcemapsDto>} query
 * @returns {Promise<IPageData<SourcemapModel>>}
 * @memberof ProjectService
 */
public async getSourcemaps(
    query: QueryListQuery<QuerySourcemapsDto>
  ): Promise<IPageData<SourcemapModel>> {
    const searchBody={
      skip: query.skip,
      take: query.take,
      where: {},
    }
    if(query.query.name){
      searchBody.where= {
        name: Like(`%${query.query.name || ''}%`),
      }
    }
    const [sourcemap, totalCount] = await this.sourcemapModel.findAndCount(searchBody);
    return {
      totalCount,
      list: sourcemap,
    };
  }


  /**
   *获取自己建立的项目
   *
   * @param {UserModel} user
   * @returns {Promise<any>}
   * @memberof ProjectService
   */
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


  /**
   *新增项目
   *
   * @param {AddProjectDto} projectInfo
   * @param {UserModel} user
   * @returns {Promise<AddProjectResDto>}
   * @memberof ProjectService
   */
  public async addProject(
    projectInfo: AddProjectDto,
    user: UserModel
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


  /**
   *  更新项目
   * @param projectInfo 
   * @param projectId 
   */
  public async updateProject(
    projectInfo: UpdateProjectDto,
    projectId: number
  ): Promise<void> {
    let project = await this.projectModel.findOne(projectId);
    project = { ...project, ...projectInfo };
    await this.projectModel.save(project);
    return;
  }


  /**
   *删除项目
   *
   * @param {number} projectId
   * @returns {Promise<void>}
   * @memberof ProjectService
   */
  public async deleteProject(projectId: number): Promise<void> {
    const project = await this.projectModel.findOne(projectId);
    await this.projectModel.remove(project);
    return;
  }


  /**
   *添加项目成员
   *
   * @param {AddMembersDto} body
   * @returns {Promise<void>}
   * @memberof ProjectService
   */
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
        }))
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

  private async parseSourcemap(
    sourcemapSrc,
    line,
    column
  ): Promise<ISourceCode> {
   try {
    var rawSourceMap = await this.httpService.axiosRef.request({
      url: sourcemapSrc,
    });
    if (!rawSourceMap || !rawSourceMap.data) {
      return null;
    }

    var consumer = await new SourceMap.SourceMapConsumer(rawSourceMap.data);

    var sm = consumer.originalPositionFor({
      line,
      column,
    });
    var sources = consumer.sources;

    if(!sm.source){
      return{
        code: null,
        line: null,
        column: null,
        sourceUrl: null,
        name: null,
      }
    }

    var smIndex = sources.indexOf(sm.source);

    var smContent = consumer.sourcesContent[smIndex];

    const rawLines = smContent.split(/\r?\n/g);

    let code = '';
    for(let i =-4;i<3;i++){
      if(sm.line + i<0){
        continue;
      }
      code+=`${rawLines[sm.line + i]}
`
    }


    return {
      code: code.replace(/([^\n]{0,1000}).*\n/g,'$1\n'), //省略过长code
      line: sm.line,
      column: sm.column,
      sourceUrl: sm.source,
      name: sm.name,
    };
   } catch (error) {
     return null;
   }
  }


  /**
   *获取源码段
   *
   * cache = true 只在缓存中找
   * 
   * @param {*} stack
   * @param {number} projectId
   * @param {string} version
   * @param {boolean} [cache=false]
   * @returns {Promise<ISourceCode>}
   * @memberof ProjectService
   */
  public async getSourceCode(
    stack: IStack,
    projectId: number,
    version: string,
    cache=false
  ): Promise<ISourceCode> {
    const client = this.redisService.getClient();
    const fileName =
      stack.url.match(/[^/]+\/?$/) && stack.url.match(/[^/]+\/?$/)[0];
    const line = stack.line;
    const column = stack.column;
    const targetSrc = stack.url;
    const cacheKey = `${projectId}-${fileName}-${line}-${column}-${version}`;
    let sourceCode = await client.get(cacheKey);
    let sourcemapSrc;

    if (sourceCode) {
      return JSON.parse(sourceCode);
    }

    if(cache){
      return null;
    }

    let sourcemap = await this.sourcemapModel.findOne({
      where: { fileName, projectId, hash: true },
    });
    if (!sourcemap) {
      sourcemap = await this.sourcemapModel.findOne({
        where: { fileName, projectId, version },
      });
    }

    if (!sourcemap) {
      const project = await this.projectModel.findOne({
        where: { id: projectId },
      });
      if (project.sourcemapOnline) {
        sourcemapSrc = targetSrc + '.map';
      }
    }

    if (!sourcemapSrc) {
      return null;
    }
    let result = await this.parseSourcemap(sourcemapSrc, line, column);


    if(!sourcemap||result){
      client.set(cacheKey, JSON.stringify(result),'EX', 3600*24*7).catch(e=>{
        console.error(e)
      });
    }
    if (!result) {
      return null;
    }

    return result;
  }
}
