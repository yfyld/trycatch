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
  PrimaryColumn,
} from 'typeorm';
import { UserModel } from '../user/user.model';
import { ProjectModel } from '../project/project.model';

@Entity()
export class ErrorModel {
  @PrimaryColumn()
  id: string;
  @ManyToMany(type => UserModel)
  @JoinTable()
  users: UserModel[];

  @ManyToOne(type => UserModel)
  guarder: UserModel;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  level: number;

  @Column()
  status: number;

  @Column()
  message: string;

  @Column()
  url: string;

  @Column()
  version: string;

  @Column()
  eventNum: number;

  @Column()
  projectId: number;

  @Column()
  userNum: number;
}
