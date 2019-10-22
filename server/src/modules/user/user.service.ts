import {
  UserModel,
  RoleModel,
  PermissionModel,
  ProjectRoleModel,
} from './user.model';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Base64 } from 'js-base64';
import { createHash } from 'crypto';
import { AUTH } from '@/app.config';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto, TokenDto, UserListReqDto, UpdateUserDto } from './user.dto';
import { IPageData, QueryListQuery } from '@/interfaces/request.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userModel: Repository<UserModel>,
    @InjectRepository(RoleModel)
    private readonly roleModel: Repository<RoleModel>,
    // @InjectRepository(ProjectRole)
    // private readonly projectRoleModel: Repository<ProjectRole>,
    private readonly jwtService: JwtService,
  ) {}

  // 密码编码
  private encodeBase64(password) {
    return password ? Base64.encode(password) : password;
  }

  // md5 编码
  private encodeMd5(password) {
    return createHash('md5')
      .update(password)
      .digest('hex');
  }

  private async getPermissionsById(id: number): Promise<PermissionModel[]> {
    const user = await this.userModel
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .leftJoinAndSelect('role.permissions', 'permission')

      .where('user.id = :id', { id })
      .getOne();

    const permissionList: PermissionModel[] = user.roles.reduce(
      (total, item) => {
        return total.concat(item.permissions);
      },
      [],
    );

    return permissionList;
  }

  public async createToken(user: UserModel): Promise<TokenDto> {
    const permissions = await this.getPermissionsById(user.id);
    const data = {
      username: user.username,
      id: user.id,
      password: user.password,
      permissions: permissions.map(item => item.code),
    };
    const accessToken = this.jwtService.sign({ data });
    return Promise.resolve({ accessToken, expiresIn: AUTH.expiresIn });
  }
  public async refreshToken(token): Promise<TokenDto> {
    try {
      const data = JSON.parse(this.encodeBase64(token.split('.')[1]));
      const user = await this.userModel.findOne(data.id);
      return this.createToken(user);
    } catch (error) {
      return null;
    }
  }

  public async validateAuthData(payload: any): Promise<any> {
    const user = await this.userModel.findOne({
      select: ['password'],
      where: {
        username: payload.data.username,
      },
    });
    const isVerified = user && payload.data.password === user.password; // lodash.isEqual(payload.data, {username:user.username});
    return isVerified ? payload.data : null;
  }

  public async signin({ username, password }): Promise<TokenDto> {
    const user = await this.userModel
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .addSelect('user.password')
      .getOne();
    const extantAuthPwd = user && user.password;
    const extantPassword =
      extantAuthPwd || this.encodeMd5(AUTH.defaultPassword);
    const submittedPassword = this.encodeMd5(this.encodeBase64(password));
    if (submittedPassword !== extantPassword) {
      return Promise.reject('密码不匹配');
    }
    return this.createToken(user);
  }

  public getUserByUsername(username: string): Promise<UserModel> {
    return this.userModel.findOne({ username });
  }

  public async getUsers(
    query: QueryListQuery<UserListReqDto>,
  ): Promise<IPageData<UserModel>> {
    const [users, totalCount] = await this.userModel.findAndCount({
      where: [
        {
          username: Like(`%${query.query.name || ''}%`),
          //nickname: Like(`%${query.query.name}%`),
        },
      ],
      skip: query.skip,
      take: query.take,
    });
    return {
      totalCount,
      list: users,
    };
  }

  public getRoles(): Promise<RoleModel[]> {
    return this.roleModel.find();
  }

  // public async validateProjectPermission(
  //   userId: number,
  //   projectId: number,
  //   permissions: string[],
  // ): Promise<boolean> {
  //   const projectRole = await this.projectRoleModel
  //     .createQueryBuilder('role')
  //     .leftJoinAndSelect('role.permissions', 'permission')
  //     .where('user.id = :userId', { userId })
  //     .where('project.id = :projectId', { projectId })
  //     .getMany();
  //   return true;
  // }

  public async addUser(user: SignupDto): Promise<UserModel> {
    user.password = this.encodeMd5(this.encodeBase64(user.password));
    const { id } = await this.userModel.save(user);
    return this.userModel.findOne(id);
  }

  public async deleteUser(userId: number): Promise<void> {
    const user = await this.userModel.findOne(userId);
    this.userModel.remove(user);
    return;
  }

  public async updateUser(body: UpdateUserDto, userId: number): Promise<void> {
    let user = await this.userModel.findOne(userId);
    user = { ...user, ...body };
    this.userModel.save(user);
    return;
  }
}
