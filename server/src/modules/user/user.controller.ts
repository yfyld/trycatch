import { Auth } from '@/decotators/user.decorators';
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
import { TokenResult } from './user.interface';
import {
  ApiBearerAuth,
  ApiUseTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Permissions } from '@/decotators/permissions.decotators';
import { PermissionsGuard } from '@/guards/permission.guard';
import { SignUpDto, LoginDto, UserListDto } from './user.dto';
@ApiUseTags('账号权限')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ title: '获取权限列表', description: '' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: Role, isArray: true })
  @HttpProcessor.handle('获取权限列表')
  @Get('/role')
  getRoles(): Promise<Role[]> {
    return this.userService.getRoles();
  }

  // 检测 Token 有效性
  @ApiOperation({ title: '检测 Token', description: '' })
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
  @ApiOperation({ title: '登陆', description: '' })
  @Post('/signin')
  @HttpProcessor.handle({ message: '登陆', error: HttpStatus.BAD_REQUEST })
  signin(@Body() body: LoginDto): Promise<TokenResult> {
    return this.userService.signin(body);
  }

  @ApiOperation({ title: '注册', description: '' })
  @HttpProcessor.handle('注册')
  @Post('/signup')
  signup(@Body() user: SignUpDto): Promise<User> {
    return this.userService.addUser(user);
  }

  // @HttpProcessor.handle('注销')
  // @Post('/signout')
  // signout(): void {
  //   return null;
  // }

  @ApiOperation({ title: '获取用户信息', description: '' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: User })
  @HttpProcessor.handle('获取用户信息')
  @Get('/info')
  @UseGuards(JwtAuthGuard)
  getUserInfo(@Auth() user: User): Promise<User> {
    return this.userService.getUserByUsername(user.username);
  }

  @ApiOperation({ title: '获取用户列表', description: '' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: UserListDto })
  @HttpProcessor.handle('获取用户列表')
  @UseGuards(JwtAuthGuard)
  @Get('/')
  getUsers(): Promise<UserListDto> {
    return this.userService.getUsers();
  }
}
