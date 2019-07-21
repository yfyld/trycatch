
import { IsString, IsDefined, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Permission {
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
export class Role {
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

  @ManyToMany(type => Permission)
  @JoinTable()
  permissions: Permission[];
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiModelProperty()
  @IsDefined()
  @IsString()
  @Column()
  username: string;

  @IsDefined()
  @IsString()
  @Column()
  @ApiModelProperty()
  password?: string;

  @ManyToMany(type => Role)
  @JoinTable()
  roles: Role[];

  @ManyToMany(type => Permission)
  @JoinTable()
  permissions: Permission[];
}