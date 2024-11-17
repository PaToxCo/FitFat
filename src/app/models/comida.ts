import { Tipo_Comida } from "./tipo_comida";
import { Usuarios } from "./usuarios";

export class Comida {
    idComida: number = 0;
    nombre: string = "";
    calorias: number = 0;
    proteinas: number = 0;
    carbohidratos: number = 0;
    grasas: number = 0;
    descripcion: string = "";
    comiFavo: boolean = false;
    usuario: Usuarios = new Usuarios();
    tipoComida: Tipo_Comida = new Tipo_Comida();
}