import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpUnauthorizedError } from '@/errors/unauthorized.error';
import { UserService } from './user.service';
import { AUTH } from '@/app.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: AUTH.jwtTokenSecret,
    });
  }

  async validate(payload: any) {
    const data = await this.userService.validateAuthData(payload);
    if (data) {
      return data;
    } else {
      throw new HttpUnauthorizedError();
    }
  }
}
