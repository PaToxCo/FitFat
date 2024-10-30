import { Routes } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { TiposComidaComponent } from './components/tipos-comida/tipos-comida.component';
import { DietaComponent } from './components/dieta/dieta.component';
import { RolComponent } from './components/rol/rol.component';
import { ControlComponent } from './components/control/control.component';
import { RecetaComponent } from './components/receta/receta.component';
import { AlimentosComponent } from './components/alimentos/alimentos.component';
import { ComidaComponent } from './components/comida/comida.component';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { RespuestaComponent } from './components/respuesta/respuesta.component';
import { ObjetivosComponent } from './components/objetivos/objetivos.component';

export const routes: Routes = [
    {
        path: 'usuarios', component: UsuariosComponent
    },
    {
        path: 'tipos-comida', component: TiposComidaComponent
    },
    {
        path: 'dietas', component: DietaComponent
    },
    {
        path: 'roles', component: RolComponent
    },
    {
        path: 'control', component: ControlComponent
    },
    {
        path: 'recetas', component: RecetaComponent
    },
    {
        path: 'alimentos', component: AlimentosComponent
    },
    {
        path: 'comidas', component: ComidaComponent
    },
    {
        path: 'consulta', component: ConsultaComponent
    },
    {
        path: 'respuesta', component: RespuestaComponent
    },
    {
        path: 'objetivos', component: ObjetivosComponent
    },
];
