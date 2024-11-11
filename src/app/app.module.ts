import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';
import { CantidadcomidasfavportipoComponent } from './components/reportes/comida/cantidadcomidasfavportipo/cantidadcomidasfavportipo.component';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ContarusuariosactivosinactivosComponent } from './components/reportes/usuarios/contarusuariosactivosinactivos/contarusuariosactivosinactivos.component';
import { ContarusuariosporrolComponent } from './components/reportes/usuarios/contarusuariosporrol/contarusuariosporrol.component';
@NgModule({
    imports: [
      BrowserModule,
      HttpClientModule,
      BrowserAnimationsModule,
      NgChartsModule,
      CantidadcomidasfavportipoComponent,
      ContarusuariosactivosinactivosComponent,
      ContarusuariosporrolComponent,
    ],
    providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes),
      provideClientHydration(),
      provideHttpClient(withFetch())
    ],
  })
export class AppModule { }
