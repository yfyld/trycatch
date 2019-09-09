import { RoleModel } from './../user/user.model';
import { IsString, IsDefined, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserModel } from '../user/user.model';

@Entity()
export class ProjectModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @Column()
  version: string;

  @Column()
  language: string;

  @Column()
  frame: string;

  @Column()
  alarmType: string;

  @Column()
  alarmHookUrl: string;

  @Column()
  sourcemapEnable: boolean;

  @Column()
  sourcemapOnline: boolean;

  @ManyToOne(type => UserModel, { cascade: true, onDelete: 'CASCADE' })
  creator: UserModel;

  @ManyToOne(type => UserModel, { cascade: true, onDelete: 'CASCADE' })
  guarder: UserModel;
}

@Entity()
export class MemberModel {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(type => ProjectModel, { cascade: true, onDelete: 'CASCADE' })
  project: ProjectModel;
  @ManyToOne(type => UserModel, { cascade: true, onDelete: 'CASCADE' })
  user: UserModel;
  @ManyToOne(type => RoleModel, { cascade: true, onDelete: 'CASCADE' })
  role: RoleModel;
}

@Entity()
export class SourcemapModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiModelProperty()
  @IsDefined()
  @IsString()
  @Column()
  url: string;
  @Column()
  version: string;

  @Column()
  hash: boolean;
  @Column()
  fileName: string;

  @ManyToOne(type => ProjectModel, { cascade: true, onDelete: 'CASCADE' })
  project: ProjectModel;
}
