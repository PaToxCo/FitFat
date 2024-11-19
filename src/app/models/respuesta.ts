import { Consulta } from './consulta';

export class Respuesta {
  idRespuesta: number = 0;
  asunto: string = "";
  descripcion: string = "";
  fechaRespuesta: Date = new Date();
  consulta: Consulta = new Consulta(); 
}
