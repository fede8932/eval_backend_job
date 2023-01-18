import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  addDevToProjectType,
  filtrarProjectsType,
  ProjRolInput,
  updateStatusType,
} from '../dto/create.input';
import { Developer } from '../entities/developer.entity';
import { Especialidad } from '../entities/especialidad.entity';
import { Proyecto } from '../entities/proyecto.entity';
import { compararRoles, filtarStatus } from '../utils/funcionesAuxiliares';

@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(Proyecto) private projectRepo: Repository<Proyecto>,
    @InjectRepository(Especialidad) private rolRepo: Repository<Especialidad>,
    @InjectRepository(Developer) private developerRepo: Repository<Developer>,
  ) {}

  async createProject(dataProject: ProjRolInput): Promise<Proyecto> {
    const { roles, ...projectData } = dataProject;
    try {
      const especialidades: Especialidad[] = [];
      await Promise.all(
        roles.map(async (rolName) => {
          const rol: Especialidad = await this.rolRepo.findOne({
            where: {
              name: rolName,
            },
          });
          especialidades.push(rol);
        }),
      );
      const newProject = this.projectRepo.create(projectData);
      newProject.especialidades = especialidades;
      return await this.projectRepo.save(newProject);
    } catch (err) {
      return err;
    }
  }
  async addDevtoProject(data: addDevToProjectType): Promise<Proyecto> {
    const { projectId, devId } = data;
    try {
      const proyecto = await this.projectRepo
        .createQueryBuilder('proyecto')
        .where('proyecto.id = :id', { id: projectId })
        .innerJoinAndSelect('proyecto.especialidades', 'especialidades')
        .select([
          'proyecto.id',
          'proyecto.nombre',
          'proyecto.descripcion',
          'proyecto.status',
          'especialidades.name',
        ])
        .getOne();
      const dev = await this.developerRepo
        .createQueryBuilder('programador')
        .where('programador.id = :id', { id: devId })
        .innerJoinAndSelect('programador.especialidades', 'especialidades')
        .select(['programador.id', 'especialidades.name'])
        .getOne();
      if (!compararRoles(proyecto.especialidades, dev.especialidades))
        throw new Error('El developer no cumple con todos los requisitos');
      proyecto.developers = [dev];
      return await this.projectRepo.save(proyecto);
    } catch (err) {
      throw err;
    }
  }
  async filtrarProjects(dataInput: filtrarProjectsType): Promise<Proyecto[]> {
    const { status, rolId } = dataInput;
    const rolWhere = rolId
      ? {
          id: rolId,
        }
      : null;
    const proyectos = await this.projectRepo.find({
      relations: {
        especialidades: true,
      },
      where: {
        especialidades: rolWhere,
      },
    });
    return filtarStatus(proyectos, status);
  }

  async updateStatusProject(dataInput: updateStatusType): Promise<Proyecto> {
    const { status, projectId } = dataInput;
    const proyecto = await this.projectRepo.findOne({
      where: {
        id: projectId,
      },
    });
    proyecto.status = status;
    return await this.projectRepo.save(proyecto);
  }
}
