import { Comida } from "./comida";

export class Receta {
    idReceta: number = 0;
    nombre: string = "";
    descripcion: string = "";
    instrucciones: string = "";
    comida: Comida = new Comida();
}
