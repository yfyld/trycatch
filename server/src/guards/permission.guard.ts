import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { HttpForbiddenError } from '@/errors/forbidden.error';
import { UserService } from '@/modules/user/user.service';
import { User } from '@/modules/user/user.model';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const permissions = [
      ...(this.reflector.get<string[]>('permissions', context.getClass()) ||
        []),
      ...(this.reflector.get<string[]>('permissions', context.getHandler()) ||
        []),
    ];
    if (permissions.length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const user = request.user;
    if (!user || !user.permissions) {
      this.handleError();
      return false;
    }
    const hasPermission = () =>
      user.permissions.some(permission => permissions.includes(permission));

    if (hasPermission()) {
      return true;
    }
    if (request.params.projectId) {
      return true;
      // return this.userService.validateProjectPermission(
      //   request.params.projectId,
      //   request.user._id,
      //   permissions,
      // );
    }
    this.handleError();
    return false;
  }

  /**
   * @function handleError
   * @description 如果解析出的数据对不上，则判定为无效
   */
  handleError() {
    throw new HttpForbiddenError();
  }
}
