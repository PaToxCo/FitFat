import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { JwtRequest } from '../models/jwt-request';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { UsuariosService } from './usuarios.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private uS: UsuariosService,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(request: JwtRequest): Observable<any> {
    return this.http.post('https://fitfat-backend.onrender.com/login', request);  
  }
  
  verificar() {
    let token = sessionStorage.getItem('token');
    return token != null;
  }

  showRole() {
    let token = sessionStorage.getItem('token');
    if (!token) {
      return null; 
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.role;
  }
  showUser() {
    return this.uS.obtenerUsuarioLogueado();
  }
  getId() {
    if (isPlatformBrowser(this.platformId)) {
      let token = sessionStorage.getItem('token');
      if (!token) {
        return null;
      }
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      console.log(decodedToken);
  
      let id = decodedToken?.id;
      if (id) {
        id = parseInt(id, 10);
        if (isNaN(id)) {
          return null;
        }
      }
      return id;
    }
    return null;
  }
}
