import { Dieta } from './dieta';
import { Receta } from './receta';

export class Alimentos {
  idAlimentos: number = 0;
  nombre: string = '';
  calorias: number = 0;
  proteinas: number = 0;
  carbohidratos: number = 0;
  grasas: number = 0;
  dieta: Dieta = new Dieta();
  receta: Receta = new Receta();
}
