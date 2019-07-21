import { Project } from './project.model';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectModel: Repository<Project>,
  ) {}

  public getProjectById(projectId: number): Promise<Project> {
    return this.projectModel.findOne(projectId);
  }

  public getProjects(): Promise<Project[]> {
    return this.projectModel.find();
  }

  public async addProject(projectInfo: Project): Promise<Project> {
    const { id } = await this.projectModel.save(projectInfo);
    return this.projectModel.findOne(id);
  }

  public async updateProject(
    projectId: number,
    projectInfo: Project,
  ): Promise<Project> {
    const project = this.projectModel.findOne(projectId);
    return project;
  }

  public async deleteProject(projectId: number): Promise<boolean> {
    const project = await this.projectModel.findOne(projectId);
    return true;
  }
}
