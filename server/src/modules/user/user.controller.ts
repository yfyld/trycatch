import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  HttpStatus,
  Query,
  Req,
  UsePipes,
} from '@nestjs/common';
import { User, Role } from './user.model';
import { UserService } from './user.service';
import { HttpProcessor } from '@/decotators/http.decotator';
import { JwtAuthGuard } from '@/guards/auth.guard';
import { ValidationPipe } from '@/pipes/validation.pipe';
import { TokenResult } from './user.interface';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Permissions } from '@/decotators/permissions.decotators';
import { PermissionsGuard } from '@/guards/permission.guard';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @HttpProcessor.handle('获取权限列表')
  @Get('/role')
  getRoles(): Promise<Role[]> {
    return this.userService.getRoles();
  }

  // 检测 Token 有效性
  @Post('check')
  @HttpProcessor.handle('检测 Token')
  checkToken(): string {
    return 'ok';
  }

  // @HttpProcessor.handle('获取用户权限')
  // @Get('/permissions')
  // getPermissions(@Query('username') username: string): Promise<Permission[]> {
  //   return this.userService.getPermissionsByusername(username);
  // }

  @Post('/signin')
  @UsePipes(new ValidationPipe())
  @HttpProcessor.handle({ message: '登陆', error: HttpStatus.BAD_REQUEST })
  signin(@Body() body: any): Promise<TokenResult> {
    return this.userService.signin(body);
  }

  @HttpProcessor.handle('注册')
  @Post('/signup')
  @UsePipes(new ValidationPipe())
  signup(@Body() user: UserDto): Promise<User> {
    return this.userService.addUser(user);
  }

  @HttpProcessor.handle('注销')
  @Post('/signout')
  signout(@Body() userInfo: any): void {
    return null;
  }

  @ApiBearerAuth()
  @HttpProcessor.handle('获取用户信息')
  @Get('/info')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('chakaninfo', 'admin')
  getUserInfo(@Req() request: any): Promise<User> {
    return this.userService.getUserByUsername(request.user.username);
  }

  @ApiBearerAuth()
  @HttpProcessor.handle('获取用户列表')
  @UseGuards(JwtAuthGuard)
  @Get('/')
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }
}
