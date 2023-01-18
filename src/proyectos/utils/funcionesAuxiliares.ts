import { ProjectStatus } from '../dto/create.input';
import { Proyecto } from '../entities/proyecto.entity';

export const compararRoles = (arrRolProject: any[], arrRolDev: any[]) => {
  for (let i = 0; i < arrRolProject.length; i++) {
    const ver = arrRolDev.filter(
      (rolDev) => rolDev.name === arrRolProject[i].name,
    );
    if (ver.length === 0) return false;
  }
  return true;
};

export const filtarStatus = (
  arrayProjects: Proyecto[],
  inputStatus: ProjectStatus,
) => {
  const filterProjects = inputStatus
    ? arrayProjects.filter((project) => project.status === inputStatus)
    : arrayProjects;
  return filterProjects;
};
