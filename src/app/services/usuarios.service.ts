import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuarios } from '../models/usuarios';
import { environment } from '../../environments/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url = `${base_url}/usuarios`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Usuarios[]>(this.url);
  }
}
