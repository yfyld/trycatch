import { IsString, IsDefined, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiModelProperty()
  @IsDefined()
  @IsNotEmpty({ message: '账号？' })
  @IsString({ message: '字符串？' })
  username: string;

  @ApiModelProperty()
  @IsDefined()
  @IsNotEmpty({ message: '密码？' })
  @IsString({ message: '字符串？' })
  password: string;
}

export class SignUpDto {
  @ApiModelProperty()
  @IsDefined()
  @IsNotEmpty({ message: '账号？' })
  @IsString({ message: '字符串？' })
  username: string;

  @ApiModelProperty()
  @IsDefined()
  @IsNotEmpty({ message: '密码？' })
  @IsString({ message: '字符串？' })
  password: string;
}
