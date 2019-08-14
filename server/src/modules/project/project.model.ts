import { Role } from './../user/user.model';
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
import { User } from '../user/user.model';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

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

  @ManyToOne(type => User)
  creator: User;

  @ManyToOne(type => User)
  guarder: User;
}

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(type => Project)
  project: Project;
  @ManyToOne(type => User)
  user: User;
  @ManyToOne(type => Role)
  role: Role;
}

@Entity()
export class Sourcemap {
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

  @ManyToOne(type => Project)
  project: Project;
}
