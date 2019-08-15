import { IsNotEmpty, IsDefined, IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ErrorDto {
  @ApiModelProperty()
  @IsDefined()
  @IsNotEmpty({ message: '项目名称不能为空' })
  name: string;
  @ApiModelProperty()
  id: string;
  @ApiModelProperty()
  type: string;
  @ApiModelProperty()
  level: number;
  @ApiModelProperty()
  status: number;
  @ApiModelProperty()
  message: string;
  @ApiModelProperty()
  url: string;
  @ApiModelProperty()
  version?: string;
  @ApiModelProperty()
  projectId: number;
}

export class ErrorListItemDto {
  @ApiModelProperty()
  @IsDefined()
  @IsNotEmpty({ message: '项目名称不能为空' })
  projectId: string;

  @IsNotEmpty({ message: '项目名称不能为空' })
  endDate: number;

  @IsNotEmpty({ message: '项目名称不能为空' })
  startDate: number;

  @IsNotEmpty({ message: '项目名称不能为空' })
  type: string;

  @IsNotEmpty({ message: '项目名称不能为空' })
  level: string;

  @IsNotEmpty({ message: '项目名称不能为空' })
  version: string;

  @IsNotEmpty({ message: '项目名称不能为空' })
  status: string;

  @IsNotEmpty({ message: '项目名称不能为空' })
  guarderId: number;
}

export class SourceCodeDto {
  code: string;
  line: number;
  column: number;
  sourceUrl: string;
  name: string;
}
