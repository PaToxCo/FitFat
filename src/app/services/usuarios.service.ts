import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuarios } from '../models/usuarios';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { UsuariosPorRolDTO } from '../models/dtos/UsuariosPorRolDTO';
import { ContarUsuariosActivosInactivosDTO } from '../models/dtos/ContarUsuariosActivosInactivosDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private url = `${base_url}/usuarios`;
  private listaCambio = new Subject<Usuarios[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Usuarios[]>(this.url);
  }
  insert(ve: Usuarios) {
    return this.http.post(this.url, ve);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Usuarios[]) {
    this.listaCambio.next(listaNueva);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
    return this.http.get<Usuarios>(`${this.url}/${id}`);
  }
  update(u: Usuarios) {
    return this.http.put(this.url, u);
  }
  obtenerUsuariosPorRol(): Observable<UsuariosPorRolDTO[]> {
    return this.http.get<UsuariosPorRolDTO[]>(`${this.url}/usuarios-por-rol`);
  }

  contarUsuariosActivosInactivos(): Observable<
    ContarUsuariosActivosInactivosDTO[]
  > {
    return this.http.get<ContarUsuariosActivosInactivosDTO[]>(
      `${this.url}/contar-usuarios`
    );
  }
  obtenerUsuarioLogueado(): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No se encontró el token de autenticación');
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.url}/me`, { headers });
  }
  
}
