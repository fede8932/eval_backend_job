/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  ArrayMinSize,
  MaxLength,
  IsOptional,
  IsInt,
} from 'class-validator';

@InputType()
export class CreateRolInput {
  @IsNotEmpty({ message: 'el nombre no puede estar vacío' })
  @Field()
  name: string;
}

@InputType()
export class CreateDevInput {
  @IsNotEmpty({ message: 'el nombre no puede estar vacío' })
  @Field()
  nombre: string;
  @IsNotEmpty({ message: 'el email no puede estar vacío' })
  @IsEmail()
  @Field()
  email: string;
}

@InputType()
export class DevRolInput extends CreateDevInput {
  @ArrayMinSize(1, { message: 'El developer debe tener al menos un rol' })
  @Field((type) => [String])
  roles: string[];
}

@InputType()
export class CreateProjectInput {
  @IsNotEmpty({ message: 'el nombre no puede estar vacío' })
  @Field()
  nombre: string;
  @MaxLength(150, { message: 'Superaste el límite de 150 caracteres' })
  @Field()
  descripcion?: string;
}

@InputType()
export class ProjRolInput extends CreateProjectInput {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ArrayMinSize(1, { message: 'El proyecto requiere al menos un rol' })
  @Field((type) => [String])
  roles: string[];
}

export enum ProjectStatus {
  desarrollo = 'desarrollo',
  creado = 'creado',
  produccion = 'produccion',
}

registerEnumType(ProjectStatus, {
  name: 'ProjectStatus', // this one is mandatory
});

@InputType()
export class addDevToProjectType {
  @IsInt()
  @Field((type) => Int)
  devId: number;
  @IsInt()
  @Field((type) => Int)
  projectId: number;
}

@InputType()
export class filtrarDevType {
  @IsOptional()
  @IsInt()
  @Field((type) => Int, { nullable: true })
  projectId?: number;
  @IsOptional()
  @Field((type) => Int, { nullable: true })
  rolId?: number;
}

@InputType()
export class filtrarProjectsType {
  @IsOptional()
  @IsInt()
  @Field((type) => Int, { nullable: true })
  rolId?: number;
  @IsOptional()
  @Field((type) => ProjectStatus, { nullable: true })
  status?: ProjectStatus;
}

@InputType()
export class updateStatusType {
  @IsInt()
  @Field((type) => Int)
  projectId: number;
  @Field((type) => ProjectStatus)
  status: ProjectStatus;
}
