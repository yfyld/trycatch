import { IsString, IsDefined, IsNotEmpty, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from './user.model';

export class SigninDto {
  @ApiModelProperty()
  @IsNotEmpty({ message: '账号不能为空' })
  @IsString({ message: '账号必须为字符串' })
  username: string;

  @ApiModelProperty()
  @IsNotEmpty({ message: '账号不能为空' })
  @IsString({ message: '账号必须为字符串' })
  @Length(6, 50, { message: '至少6个字符组成' })
  password: string;
}

export class TokenDto {
  @ApiModelProperty()
  accessToken: string;
  @ApiModelProperty()
  expiresIn: number;
}

export class SignupDto {
  @ApiModelProperty()
  @IsNotEmpty({ message: '账号不能为空' })
  @IsString({ message: '账号必须为字符串' })
  username: string;

  @ApiModelProperty()
  @IsString({ message: '账号必须为字符串' })
  nickname: string;

  @ApiModelProperty()
  @IsNotEmpty({ message: '账号不能为空' })
  @IsString({ message: '账号必须为字符串' })
  @Length(6, 50, { message: '至少6个字符组成' })
  password: string;
}

export class UpdateUserDto {
  @ApiModelProperty()
  @IsString({ message: '账号必须为字符串' })
  nickname: string;

  @ApiModelProperty()
  @IsString({ message: '邮箱必须为字符串' })
  email: string;

  @ApiModelProperty()
  @IsString({ message: '手机号号必须为字符串' })
  mobile: string;
}

export class UserListReqDto {
  @ApiModelProperty()
  name: string;
}
