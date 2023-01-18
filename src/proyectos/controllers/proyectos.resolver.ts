/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import {
  addDevToProjectType,
  CreateRolInput,
  DevRolInput,
  filtrarDevType,
  filtrarProjectsType,
  ProjRolInput,
  updateStatusType,
} from '../dto/create.input';
import { Developer } from '../entities/developer.entity';
import { Especialidad } from '../entities/especialidad.entity';
import { EspecialidadService } from '../services/especialidades.service';
import { DeveloperService } from '../services/developers.service';
import { Proyecto } from '../entities/proyecto.entity';
import { ProyectoService } from '../services/proyectos.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver()
export class ProyectosResolver {
  constructor(
    private especialidadService: EspecialidadService,
    private developerService: DeveloperService,
    private proyectoService: ProyectoService,
  ) {}
  @Query((returns) => [Especialidad], {
    description: 'Retorna el array con todos los roles',
  })
  async consultarRoles() {
    try {
      return await this.especialidadService.findAll();
    } catch (err) {
      throw err;
    }
  }

  @Mutation((returns) => Especialidad, {
    description: 'Recibe el nombre del rol y retorna el rol creado',
  })
  async createRol(@Args('rolInput') rolInput: CreateRolInput) {
    try {
      return await this.especialidadService.createRol(rolInput);
    } catch (err) {
      throw err;
    }
  }

  @Mutation((returns) => Developer, {
    description:
      'Recibe el nombre, email y array de especialidades del dev y retorna el dev creado',
  })
  async createDev(@Args('devInput') devInput: DevRolInput) {
    try {
      return await this.developerService.createDeveloper(devInput);
    } catch (err) {
      throw err;
    }
  }

  @Mutation((returns) => Proyecto, {
    description:
      'Recibe el nombre, descripcion y array de especialidades del proyecto y retorna el proyecto creado',
  })
  async createProject(@Args('projInput') projInput: ProjRolInput) {
    try {
      return await this.proyectoService.createProject(projInput);
    } catch (err) {
      throw err;
    }
  }

  @Mutation((returns) => Proyecto, {
    description:
      'Recibe el id del proyecto y del developer y retorna el proyecto',
  })
  async addDevtoProject(@Args('input') input: addDevToProjectType) {
    try {
      return await this.proyectoService.addDevtoProject(input);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_MODIFIED,
          error: `No es posible vincular el developer a este proyecto - ${err}`,
        },
        HttpStatus.NOT_MODIFIED,
        {
          cause: err,
        },
      );
    }
  }

  @Mutation((returns) => Proyecto, {
    description:
      'Recibe el id y nuevo estado del proyecto y retorna el proyecto modificado',
  })
  async updateStatusProject(@Args('input') input: updateStatusType) {
    try {
      return await this.proyectoService.updateStatusProject(input);
    } catch (err) {
      throw err;
    }
  }

  @Query((returns) => [Developer], {
    description:
      'Retorna el array con todos los programadores que cumplan con los filtros',
  })
  async filtrarDev(@Args('dataInput') dataInput: filtrarDevType) {
    try {
      return await this.developerService.filtrarDev(dataInput);
    } catch (err) {
      throw err;
    }
  }

  @Query((returns) => [Proyecto], {
    description:
      'Retorna el array con todos los proyectos que cumplan con los filtros',
  })
  async filtrarProjecto(@Args('dataInput') dataInput: filtrarProjectsType) {
    try {
      return await this.proyectoService.filtrarProjects(dataInput);
    } catch (err) {
      throw err;
    }
  }
}
