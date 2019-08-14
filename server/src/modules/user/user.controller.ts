import { QueryList } from './../../decotators/query-list.decorators';
import { Auth } from '@/decotators/user.decorators';
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  HttpStatus,
  Put,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserModel, RoleModel } from './user.model';
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
import {
  SignupDto,
  SigninDto,
  TokenDto,
  UserListReqDto,
  UpdateUserDto,
} from './user.dto';
import { QueryListResult, PageData } from '@/interfaces/request.interface';
import { UseInterceptors } from '_@nestjs_common@6.3.1@@nestjs/common';
@ApiUseTags('账号权限')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ title: '获取权限列表', description: '' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: RoleModel, isArray: true })
  @HttpProcessor.handle('获取权限列表')
  @Get('/role')
  getRoles(): Promise<RoleModel[]> {
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
  signin(@Body() body: SigninDto): Promise<TokenDto> {
    return this.userService.signin(body);
  }

  @ApiOperation({ title: '注册', description: '' })
  @HttpProcessor.handle('注册')
  @Post('/signup')
  async signup(@Body() user: SignupDto): Promise<TokenDto> {
    const newUser = await this.userService.addUser(user);
    return this.userService.createToken(newUser);
  }

  @ApiOperation({ title: '修改用户信息', description: '' })
  @HttpProcessor.handle('修改用户信息')
  @UseGuards(JwtAuthGuard)
  @Put('/')
  updateUser(
    @Body() body: UpdateUserDto,
    @Auth() user: UserModel,
  ): Promise<void> {
    return this.userService.updateUser(body, user.id);
  }

  // @HttpProcessor.handle('注销')
  // @Post('/signout')
  // signout(): void {
  //   return null;
  // }
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ title: '获取用户信息', description: '' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: UserModel })
  @HttpProcessor.handle('获取用户信息')
  @Get('/info')
  @UseGuards(JwtAuthGuard)
  getUserInfo(@Auth() user: UserModel): Promise<UserModel> {
    return this.userService.getUserByUsername(user.username);
  }

  @ApiOperation({ title: '获取用户列表', description: '' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: UserModel })
  @HttpProcessor.handle('获取用户列表')
  @UseGuards(JwtAuthGuard)
  @Get('/')
  getUsers(
    @QueryList() query: QueryListResult<UserListReqDto>,
  ): Promise<PageData<UserModel>> {
    return this.userService.getUsers(query);
  }
}
