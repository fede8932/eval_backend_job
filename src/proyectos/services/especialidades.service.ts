import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRolInput } from '../dto/create.input';
import { Especialidad } from '../entities/especialidad.entity';

@Injectable()
export class EspecialidadService {
  constructor(
    @InjectRepository(Especialidad) private rolRepo: Repository<Especialidad>,
  ) {}

  async findAll(): Promise<Especialidad[]> {
    return await this.rolRepo.find();
  }

  async createRol(dataRol: CreateRolInput): Promise<Especialidad> {
    const newRol = this.rolRepo.create(dataRol);
    return await this.rolRepo.save(newRol);
  }
}
