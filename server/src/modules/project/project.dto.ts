import { IsNotEmpty, IsDefined, IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '../user/user.model';

export class AddProjectDto {
  @ApiModelProperty()
  @IsDefined()
  @IsNotEmpty({ message: '项目名称不能为空' })
  name: string;
  guarderId?: number;
  adminId?: number;
  guarder?: User;
  admin?: User;
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
  name?: string;
}

export class ProjectDto {
  @ApiModelProperty()
  id: number;
}

export class UpdateProjectDto {
  @ApiModelProperty()
  @IsNotEmpty({ message: '项目ID不能为空' })
  id: number;
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
