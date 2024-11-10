import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Comida } from '../models/comida';
import { Tipo_Comida } from '../models/tipo_comida';
import { Usuarios } from '../models/usuarios';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ComidaService {

  private url = `${base_url}/comidas`;
  private listaCambio = new Subject<Comida[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Comida[]> {
    return this.http.get<Comida[]>(this.url);
  }

  insert(co: Comida): Observable<Comida> {
    return this.http.post<Comida>(this.url, co);
  }

  getList(): Observable<Comida[]> {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Comida[]): void {
    this.listaCambio.next(listaNueva);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
    return this.http.get<Comida>(`${this.url}/${id}`);
  }

  update(c: Comida) {
    return this.http.put(this.url,c);
  }
}
