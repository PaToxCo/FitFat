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
import { CreaeditausuariosComponent } from './components/usuarios/creaeditausuarios/creaeditausuarios.component';
import { CreaeditatipoComidasComponent } from './components/tipos-comida/creaeditatipo-comidas/creaeditatipo-comidas.component';
import { CreaeditacomidaComponent } from './components/comida/creaeditacomida/creaeditacomida.component';
import { CreaeditadietaComponent } from './components/dieta/creaeditadieta/creaeditadieta.component';
import { CreaeditacontrolComponent } from './components/control/creaeditacontrol/creaeditacontrol.component';
import { CreaeditarecetaComponent } from './components/receta/creaeditareceta/creaeditareceta.component';
import { CreaeditaalimentosComponent } from './components/alimentos/creaeditaalimentos/creaeditaalimentos.component';
import { CreaeditaobjetivosComponent } from './components/objetivos/creaeditaobjetivos/creaeditaobjetivos.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { SumacaloriasusuarioComponent } from './components/reportes/comida/sumacaloriasusuario/sumacaloriasusuario.component';
import { ContarusuariosporrolComponent } from './components/reportes/usuarios/contarusuariosporrol/contarusuariosporrol.component';
import { ContarusuariosactivosinactivosComponent } from './components/reportes/usuarios/contarusuariosactivosinactivos/contarusuariosactivosinactivos.component';
import { CreaeditarolComponent } from './components/rol/creaeditarol/creaeditarol.component';
import { CantidaddietaporusuarioComponent } from './components/reportes/dieta/cantidaddietaporusuario/cantidaddietaporusuario.component';
import { DuraciondietasporusuarioComponent } from './components/reportes/dieta/duraciondietasporusuario/duraciondietasporusuario.component';
import { RolesactivosComponent } from './components/reportes/rol/rolesactivos/rolesactivos.component';


export const routes: Routes = [
    {
        path: 'usuarios', component: UsuariosComponent,
        children:[
            {
                path:'nuevo',component: CreaeditausuariosComponent
            },
            {
                path: 'ediciones/:id', component: CreaeditausuariosComponent,
            },
        ]
    },
    {
        path: 'tipos-comida', component: TiposComidaComponent,
        children:[
            {
                path:'nuevo',component: CreaeditatipoComidasComponent
            },
            {
                path: 'ediciones/:id', component: CreaeditatipoComidasComponent,
            },
        ]
    },
    {
        path: 'dietas', component: DietaComponent,
        children:[
            {
                path:'nuevo',component: CreaeditadietaComponent
            },
            {
                path: 'ediciones/:id', component: CreaeditadietaComponent,
            },
        ]
    },
    {
        path: 'roles', component: RolComponent,
        children:[
            {
                path:'nuevo', component: CreaeditarolComponent,
            },
            {
                path: 'ediciones/:id', component: CreaeditarolComponent,
            },
        ]
    },
    {
        path: 'control', component: ControlComponent,
        children:[
            {
                path:'nuevo',component: CreaeditacontrolComponent
            },
            {
                path: 'ediciones/:id', component: CreaeditacontrolComponent,
            },
        ]
    },
    {
        path: 'recetas', component: RecetaComponent,
        children:[
            {
                path:'nuevo',component: CreaeditarecetaComponent
            },
            {
                path: 'ediciones/:id', component: CreaeditarecetaComponent,
            },
        ]
    },
    {
        path: 'alimentos', component: AlimentosComponent,
        children:[
            {
                path:'nuevo',component: CreaeditaalimentosComponent
            },
            {
                path: 'ediciones/:id', component: CreaeditaalimentosComponent,
            },
        ]
    },
    {
        path: 'comidas', component: ComidaComponent,
        children:[
            {
                path:'nuevo',component: CreaeditacomidaComponent
            },
            {
                path: 'ediciones/:id', component: CreaeditacomidaComponent,
            },
        ]
    },
    {
        path: 'consulta', component: ConsultaComponent
    },
    {
        path: 'respuesta', component: RespuestaComponent
    },
    {
        path: 'objetivos', component: ObjetivosComponent,
        children:[
            {
                path:'nuevo',component: CreaeditaobjetivosComponent
            },
            {
                path: 'ediciones/:id', component: CreaeditaobjetivosComponent,
            },
        ]
    },
    {
        path:'reportes',component:ReportesComponent,
        children:[
          {
            path:'comidafavorita',component:SumacaloriasusuarioComponent,
          },
          {
            path:'contar-usuarios',component:ContarusuariosactivosinactivosComponent,
          },
          {
            path:'usuarios-por-rol',component:ContarusuariosporrolComponent,
          },
          {
            path:'quantitydiet', component:CantidaddietaporusuarioComponent,
          },
          {
            path:'totalduration', component:DuraciondietasporusuarioComponent,
          },
          {
            path:'activerol', component:RolesactivosComponent,
          }
            
        ]
      },
];
