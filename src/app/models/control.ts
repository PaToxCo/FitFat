import { Dieta } from "./dieta";
import { Usuarios } from "./usuarios";

export class Control {
    idControl: number = 0;
    peso: number = 0;
    talla: number = 0; 
    edad: number = 0;
    genero: string = ""; 
    dieta: Dieta = new Dieta(); 
    usuario: Usuarios = new Usuarios(); 
    fecha: Date = new Date(); 
}
