/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Developer } from './developer.entity';
import { Proyecto } from './proyecto.entity';

@Entity()
@ObjectType()
export class Especialidad {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;
  @Column()
  @Field((type) => String)
  name: string;

  @ManyToMany(() => Developer, (developer) => developer.especialidades)
  developers: Developer[];
  @ManyToMany(() => Proyecto, (proyecto) => proyecto.especialidades)
  proyectos: Proyecto[];
}
