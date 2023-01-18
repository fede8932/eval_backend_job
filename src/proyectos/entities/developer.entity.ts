/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Especialidad } from './especialidad.entity';
import { Proyecto } from './proyecto.entity';

@Entity()
@ObjectType()
export class Developer {
  @PrimaryGeneratedColumn() // typeorm
  @Field((type) => Int) // graphQL
  id: number; // typescript

  @Column()
  @Field((type) => String)
  nombre: string;

  @Column()
  @Field((type) => String)
  email: string;

  @ManyToMany(() => Proyecto, (proyecto) => proyecto.developers, {
    cascade: true,
  })
  @JoinTable({
    name: 'devs_projects',
    joinColumn: {
      name: 'dev_id',
    },
    inverseJoinColumn: {
      name: 'proj_id',
    },
  })
  proyectos: Proyecto[];

  @ManyToMany(() => Especialidad, (especialidad) => especialidad.developers, {
    cascade: true,
  })
  @JoinTable({
    name: 'devs_especialidad',
    joinColumn: {
      name: 'dev_id',
    },
    inverseJoinColumn: {
      name: 'esp_id',
    },
  })
  especialidades: Especialidad[];
}
