import { Usuarios } from './usuarios';

export class Objetivos {
  idObjetivos: number = 0;
  descripcion: string = '';
  tipo_objetivo: string = '';
  fecha_inicio: Date = new Date();
  fecha_fin: Date = new Date();
  estado: string = '';
  usuario: Usuarios = new Usuarios();
}
