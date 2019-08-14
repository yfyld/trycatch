import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModel, RoleModel, PermissionModel } from './user.model';

import { JwtStrategy } from './jwt.strategy';
import { AUTH } from '@/app.config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
// import { ProjectModule } from '../project/project.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@/pipes/validation.pipe';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel, RoleModel, PermissionModel]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: AUTH.jwtTokenSecret,
      signOptions: { expiresIn: AUTH.expiresIn },
    }),
  ],
  providers: [
    UserService,
    JwtStrategy,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
