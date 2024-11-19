import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Rol } from '../models/rol';
import { Observable, Subject } from 'rxjs';
import { RolesActivosDTO } from '../models/dtos/RolesActivosDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private url = `${base_url}/roles`;
  private listaCambio= new Subject<Rol[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Rol[]>(this.url);
  }
  insert(rol: Rol) {
    return this.http.post(this.url, rol);
  }
  setList(listaNueva:Rol[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Rol>(`${this.url}/${id}`);
  }
  update(rol: Rol){
    return this.http.put(this.url,rol);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listarrolesactivos(): Observable<RolesActivosDTO[]>{
    return this.http.get<RolesActivosDTO[]>(`${this.url}/activerol`);
  }
}
