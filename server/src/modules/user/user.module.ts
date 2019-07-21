import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, Role, Permission } from './user.model';

import { JwtStrategy } from './jwt.strategy';
import { AUTH } from '@/app.config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
// import { ProjectModule } from '../project/project.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Permission]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: AUTH.jwtTokenSecret,
      signOptions: { expiresIn: AUTH.expiresIn },
    }),
  ],
  providers: [UserService, JwtStrategy],
  controllers: [
    UserController,
  ],
  exports: [UserService],
})
export class UserModule {
}
