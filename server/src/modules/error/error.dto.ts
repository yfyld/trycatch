import { IsNotEmpty, IsDefined, IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ErrorTypeDto {
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

export class ErrorTypeListItemDto {
  @ApiModelProperty()
  @IsDefined()
  @IsNotEmpty({ message: '项目名称不能为空' })
  name: string;
}

export class SourceCodeDto {
  code: string;
  line: number;
  column: number;
  sourceUrl: string;
  name: string;
}
