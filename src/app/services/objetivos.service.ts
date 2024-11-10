import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Objetivos } from '../models/objetivos';
import { Subject } from 'rxjs';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class ObjetivosService {
  private url = `${base_url}/objetivos`;
  private listaCambio = new Subject<Objetivos[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Objetivos[]>(this.url);
  }
  insert(se: Objetivos) {
    return this.http.post(this.url, se);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva:Objetivos[]) {
    this.listaCambio.next(listaNueva);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
    return this.http.get<Objetivos>(`${this.url}/${id}`);
  }
  update(s:Objetivos){
    return this.http.put(this.url,s);
  }
}
