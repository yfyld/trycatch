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
export class ErrorType {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToMany(type => User)
  @JoinTable()
  users: User[];
}
