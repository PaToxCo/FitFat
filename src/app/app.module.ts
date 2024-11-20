import { importProvidersFrom, NgModule, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';
import { CantidadcomidasfavportipoComponent } from './components/reportes/comida/cantidadcomidasfavportipo/cantidadcomidasfavportipo.component';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ContarusuariosactivosinactivosComponent } from './components/reportes/usuarios/contarusuariosactivosinactivos/contarusuariosactivosinactivos.component';
import { ContarusuariosporrolComponent } from './components/reportes/usuarios/contarusuariosporrol/contarusuariosporrol.component';
import { LoginService } from './services/login.service';
import { JwtModule } from '@auth0/angular-jwt';
import { tokenGetter } from './app.config';
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
      provideHttpClient(withFetch()),
      importProvidersFrom(
        JwtModule.forRoot({
          config: {
            tokenGetter: tokenGetter,
            allowedDomains: ['fitfat-backend.onrender.com'],
            disallowedRoutes: ['https://fitfat-backend.onrender.com/login/forget'],
          },
        })
      ),
    ],
  })
export class AppModule {
  role: string = '';
  constructor(private loginService: LoginService) {}
  cerrar() {
    sessionStorage.clear();
  }

  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }
  isDeveloper() {
    return this.role === 'DEVELOPER';
  }

  isTester() {
    return this.role === 'TESTER';
  }
 }
