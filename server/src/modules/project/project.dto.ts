import {
  IsNotEmpty,
  IsDefined,
  IsInt,
  IsString,
  IsBoolean,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '../user/user.model';

export class AddProjectDto {
  @ApiModelProperty()
  @IsDefined()
  @IsNotEmpty({ message: '项目名称不能为空' })
  name: string;

  @ApiModelProperty()
  @IsString({ message: '账号必须为字符串' })
  description: string;

  @ApiModelProperty()
  @IsString({ message: '账号必须为字符串' })
  language: string;

  @ApiModelProperty()
  @IsString({ message: '账号必须为字符串' })
  version: string;

  guarderId?: number;
  adminId?: number;
  guarder?: User;
  admin?: User;
}

export class AddProjectResDto {
  id: number;
}

export class AddMembersDto {
  @ApiModelProperty()
  @IsNotEmpty({ message: '项目id不能为空' })
  projectId: number;
  memberIds: number[];
}

export class DeleteMembersDto {
  @ApiModelProperty()
  @IsNotEmpty({ message: '项目id不能为空' })
  projectId: number;
  memberIds: number[];
}

export class UpdateMembersDto {
  @ApiModelProperty()
  @IsNotEmpty({ message: '项目id不能为空' })
  id: number;
  @ApiModelProperty()
  name?: string;
}

export class QueryProjectsDto {
  @ApiModelProperty()
  @IsString({ message: 'projectName必须为字符串' })
  projectName: string;
}

export class ProjectDto {
  id: number;
  name: string;
  description: string;
  guarder: User;
  creator: User;
  version: string;
  language: string;
  frame: string;
  members: any[];
  sourcemapEnable: boolean;
  sourcemap: any[];
  alarmType: string;
  alarmHookUrl: string;
  sourcemapOnline: boolean;
}

export class UpdateProjectDto {
  @ApiModelProperty()
  @IsString({ message: '项目名必须为字符串' })
  name: string;

  @ApiModelProperty()
  @IsString({ message: '描述必须为字符串' })
  description: string;

  @ApiModelProperty()
  @IsString({ message: '语言必须为字符串' })
  language: string;

  @ApiModelProperty()
  @IsString({ message: '版本必须为字符串' })
  version: string;

  @ApiModelProperty()
  @IsString({ message: '版本必须为字符串' })
  frame: string;

  @ApiModelProperty()
  @IsBoolean({ message: 'sourcemapEnable必须为字符串' })
  sourcemapEnable: boolean;

  @ApiModelProperty()
  @IsBoolean({ message: 'sourcemapOnline必须为布尔值' })
  sourcemapOnline: boolean;

  @ApiModelProperty()
  @IsString({ message: 'alarmType必须为布尔值' })
  alarmType: string;

  @ApiModelProperty()
  @IsString({ message: 'alarmHookUrl必须为字符串' })
  alarmHookUrl: string;

  @ApiModelProperty()
  @IsInt({ message: 'guarderId不合法' })
  guarderId: number;
}

// export class ProjectDto {
//     @ApiModelProperty()
//     @IsDefined()
//     @IsInt({message: '项目ID必须是整数'})
//     id: number;

//     @ApiModelProperty()
//     @IsDefined()
//     @IsNotEmpty({ message: '项目名称不能为空' })
//     name: string;

// }
