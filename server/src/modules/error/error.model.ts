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
import { User } from '../user/user.model';
import { Project } from '../project/project.model';

@Entity()
export class ErrorType {
  @PrimaryColumn()
  id: string;
  @ManyToMany(type => User)
  @JoinTable()
  users: User[];

  @ManyToOne(type => User)
  guarder: User;

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
