import { User, Role, Permission } from './user.model';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Base64 } from 'js-base64';
import { createHash } from 'crypto';
import { AUTH } from '@/app.config';
import { TokenResult } from './user.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userModel: Repository<User>,
    @InjectRepository(Role)
    private readonly roleModel: Repository<Role>,
    private readonly jwtService: JwtService,
  ) {}

  // 密码编码
  private decodeBase64(password) {
    return password ? Base64.decode(password) : password;
  }

  // md5 编码
  private decodeMd5(password) {
    return createHash('md5')
      .update(password)
      .digest('hex');
  }

  private async getPermissionsById(id: number): Promise<Permission[]> {
    const user = await this.userModel
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.roles', 'role')
      .innerJoinAndSelect('role.permissions', 'permission')

      .where('user.id = :id', { id })
      .getOne();

    const permissionList: Permission[] = user.roles.reduce((total, item) => {
      return total.concat(item.permissions);
    }, []);

    return permissionList;
  }

  private async createToken(user: User): Promise<TokenResult> {
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

  public async validateAuthData(payload: any): Promise<any> {
    const user = await this.userModel.findOne({
      username: payload.data.username,
    });
    const isVerified = payload.data.password === user.password; // lodash.isEqual(payload.data, {username:user.username});
    return isVerified ? payload.data : null;
  }

  public async signin({ username, password }): Promise<TokenResult> {
    const user = await this.userModel.findOne({ username });
    const extantAuthPwd = user && user.password;
    const extantPassword =
      extantAuthPwd || this.decodeMd5(AUTH.defaultPassword);
    const submittedPassword = this.decodeMd5(this.decodeBase64(password));
    if (submittedPassword !== extantPassword) {
      return Promise.reject('密码不匹配');
    }
    return this.createToken(user);
  }

  public getUserByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username });
  }

  public getUsers(): Promise<User[]> {
    return this.userModel.find({ select: ['username'] });
  }

  public getRoles(): Promise<Role[]> {
    return this.roleModel.find();
  }

  public async addUser(userInfo: User): Promise<User> {
    userInfo.password = this.decodeMd5(this.decodeBase64(userInfo.password));
    const { id } = await this.userModel.save(userInfo);
    return this.userModel.findOne(id);
  }
}
