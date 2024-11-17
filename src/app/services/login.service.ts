import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequest } from '../models/jwt-request';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  // Método de login que guarda el token en sessionStorage
  login(request: JwtRequest): Observable<any> {
    return this.http.post('http://localhost:8080/login', request);  // No subscribas aquí
  }
  

  // Método para verificar si el token existe
  verificar() {
    let token = sessionStorage.getItem('token');
    return token != null;
  }

  // Método para obtener el rol del usuario desde el token
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
    let token = sessionStorage.getItem('token');
    if (!token) {
      return null;
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.user || 'Información no disponible';
  }
}
