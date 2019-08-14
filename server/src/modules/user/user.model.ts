import { IsString, IsDefined, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { ProjectModel } from '../project/project.model';
import { Exclude } from 'class-transformer';

@Entity()
export class PermissionModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  @ApiModelProperty()
  name: string;

  @Column({ unique: true })
  @ApiModelProperty()
  code: string;

  @Column()
  @ApiModelProperty()
  status: number;
}

@Entity()
export class RoleModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiModelProperty()
  name: string;

  @Column()
  @ApiModelProperty()
  code: string;

  @Column('int')
  @ApiModelProperty()
  status: number;

  @Column('int')
  @ApiModelProperty()
  global: number;

  @ManyToMany(type => PermissionModel)
  @JoinTable()
  permissions: PermissionModel[];
}

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  nickname: string;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @Exclude()
  @Column({ select: false })
  password: string;

  @ManyToMany(type => RoleModel)
  @JoinTable()
  roles: RoleModel[];

  @ManyToMany(type => PermissionModel)
  @JoinTable()
  permissions: PermissionModel[];
}

@Entity()
export class TeamModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiModelProperty()
  @IsDefined()
  @IsString()
  @Column()
  name: string;

  @ManyToMany(type => UserModel)
  @JoinTable()
  users: UserModel[];
}

@Entity()
export class ProjectRoleModel {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => UserModel)
  @JoinColumn()
  user: UserModel;
  @OneToOne(type => RoleModel)
  @JoinColumn()
  role: RoleModel;
  @OneToOne(type => ProjectModel)
  @JoinColumn()
  project: ProjectModel;
}
