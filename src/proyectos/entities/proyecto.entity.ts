/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ProjectStatus } from '../dto/create.input';
import { Developer } from './developer.entity';
import { Especialidad } from './especialidad.entity';

@Entity()
@ObjectType()
export class Proyecto {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field((type) => String)
  nombre: string;

  @Column()
  @Field((type) => String)
  descripcion: string;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: 'creado',
  })
  @Field((type) => ProjectStatus, { nullable: true })
  status: ProjectStatus;

  @ManyToMany(() => Developer, (developer) => developer.proyectos)
  developers: Developer[];
  @ManyToMany(() => Especialidad, (especialidad) => especialidad.proyectos, {
    cascade: true,
  })
  @JoinTable({
    name: 'projecto_especialidad',
    joinColumn: {
      name: 'proj_id',
    },
    inverseJoinColumn: {
      name: 'esp_id',
    },
  })
  especialidades: Especialidad[];
}
