import { IsNotEmpty, IsDefined, IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { ProjectModel } from '../project/project.model';

export class ErrorDto {
  @IsDefined()
  @IsNotEmpty({ message: '项目名称不能为空' })
  name: string;
  id: string;
  type: string;
  level: number;
  status: number;
  message: string;
  url: string;
  version?: string;
  eventNum:number;
  project: ProjectModel | { id: number };
}

export class QueryErrorListDto {
  @IsDefined()
  @IsNotEmpty({ message: '项目名称不能为空' })
  projectId: string;

  endDate: number;

  startDate: number;

  type: string;

  level: string;

  version: string;

  status: string;

  guarderId: number;
}

export class UpdateErrorDto {
  guarderId?: number;
  level?: number;
  status?: number;
  @IsDefined()
  errorIds: string[];
  @IsDefined()
  actionType: string;
}


