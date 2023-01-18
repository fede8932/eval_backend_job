import { Module } from '@nestjs/common';
import { ProyectoService } from './services/proyectos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { Developer } from './entities/developer.entity';
import { Especialidad } from './entities/especialidad.entity';
import { ProyectosResolver } from './controllers/proyectos.resolver';
import { EspecialidadService } from './services/especialidades.service';
import { DeveloperService } from './services/developers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto, Developer, Especialidad])],
  providers: [
    ProyectosResolver,
    ProyectoService,
    EspecialidadService,
    DeveloperService,
  ],
  controllers: [],
})
export class ProyectosModule {}
