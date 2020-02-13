import { IsNotEmpty, IsDefined, IsInt, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class AddLogDto {
  data: {
    type: string;
    name: string;
    errorId: string;
    level: number;
    status: number;
    message: string;
    url: string;
    version: string;
  };
  info: {
    projectId: number;
    version: string;
  };
  libInfo: {
    libVersion: string;
    libType: string;
  };
  location?: any;
  behavior: [
    {
      type: string;
      time: number;
      page: string;
      id: string;
      class: string;
      html: string;
      method: string;
      url: string;
      oldURL: string;
      newURL: string;
    },
  ];
  stack: [
    {
      url: string;
      func: string;
      args: [];
      line: number;
      column: number;
    },
  ];
}

export class LogDto extends AddLogDto {
  location: {
    country: string;
    region: string;
    city: string;
    county: string;
    isp: string;
    area: string;
  };
  clientInfo: {
    ua: string;
    os: string;
    osVersion: string;
    browser: string;
    browserVersion: string;
    device: string;
  };
}

export class QueryStatLogDto {
  @IsInt()
  @Transform(value => Number(value))
  startDate: number;
  @IsInt()
  @Transform(value => Number(value))
  endDate: number;
  @IsInt()
  @Transform(value => Number(value))
  projectId: number;
  errorId: string;
}

export class QueryLogListDto {
  @IsInt()
  @Transform(value => Number(value))
  projectId: number;

  @IsNotEmpty()
  errorId: string;
}

export class LogListDto {
  location: any;
  clientInfo: any;
  behavior: any[];
  data: any;
  libInfo: any;
  info: any;
  id: string;
  source: any;
  ua: string;
}

interface SlsItem {
  key: string;
  value: any;
}

export class LogSlsDto {
  time: number;
  contents: SlsItem[]
}