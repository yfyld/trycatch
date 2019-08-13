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

  @ApiModelProperty()
  @IsDefined()
  @IsString()
  @Column()
  name: string;

  @ManyToMany(type => User)
  @JoinTable()
  members: User[];

  @ManyToOne(type => User)
  @JoinColumn()
  admin: User;

  @ManyToOne(type => User)
  guarder: User;

  @Column()
  sourcemapOnline: boolean;

  // @OneToMany(type => Sourcemap)
  // sourcemap: Sourcemap;
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
