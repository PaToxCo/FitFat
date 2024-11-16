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
import { ListarConsultaComponent } from './components/consulta/listarconsulta/listarconsulta.component';
import { CreaEditaConsultaComponent } from './components/consulta/creaeditaconsulta/creaeditaconsulta.component';
import { RespuestaComponent } from './components/respuesta/respuesta.component';
import { ObjetivosComponent } from './components/objetivos/objetivos.component';
import { ListarrespuestaComponent } from './components/respuesta/listarrespuesta/listarrespuesta.component';
import { CreaEditaRespuestaComponent } from './components/respuesta/creaeditarespuesta/creaeditarespuesta.component';

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
        path: 'respuesta', component: RespuestaComponent, children:[
            {
                path: '', component: ListarrespuestaComponent,
            },
            {
                path: 'crear', component: CreaEditaRespuestaComponent,
            },
            {
                path: ':idRespuesta', component: CreaEditaRespuestaComponent,
            },
        ]
    },
    {
        path: 'objetivos', component: ObjetivosComponent
    },
    {
        path: 'consulta', component: ConsultaComponent, children: [
            {
                path: 'listar', component: ListarConsultaComponent
            },
            {
                path: 'crear', component: CreaEditaConsultaComponent
            },
    
            { path: '', redirectTo: 'listar', pathMatch: 'full' }
        ]
    },
];