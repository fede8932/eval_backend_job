import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DevRolInput, filtrarDevType } from '../dto/create.input';
import { Developer } from '../entities/developer.entity';
import { Especialidad } from '../entities/especialidad.entity';
import { Proyecto } from '../entities/proyecto.entity';

@Injectable()
export class DeveloperService {
  constructor(
    @InjectRepository(Developer) private devRepo: Repository<Developer>,
    @InjectRepository(Especialidad) private rolRepo: Repository<Especialidad>,
    @InjectRepository(Proyecto) private projectRepo: Repository<Proyecto>,
  ) {}

  async createDeveloper(dataDev: DevRolInput): Promise<Developer> {
    const { roles, ...devData } = dataDev;
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
      const newDev = this.devRepo.create(devData);
      newDev.especialidades = especialidades;
      return await this.devRepo.save(newDev);
    } catch (err) {
      console.log(err);
    }
  }
  async filtrarDev(dataInput: filtrarDevType): Promise<Developer[]> {
    const { projectId, rolId } = dataInput;
    const projectWhere = projectId
      ? {
          id: projectId,
        }
      : null;
    const rolWhere = rolId
      ? {
          id: rolId,
        }
      : null;
    const programadores = await this.devRepo.find({
      relations: {
        proyectos: true,
        especialidades: true,
      },
      where: {
        proyectos: projectWhere,
        especialidades: rolWhere,
      },
    });
    return programadores;
  }
}
