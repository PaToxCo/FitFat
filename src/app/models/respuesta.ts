import { Consulta } from './consulta';

export class Respuesta {
  idRespuesta: number = 0;
  fechaRespuesta: Date = new Date();
  asunto: number = 0;
  descripcion: string = '';
  consulta: Consulta = new Consulta();
}
