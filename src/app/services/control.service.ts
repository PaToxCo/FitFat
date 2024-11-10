import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Control } from '../models/control';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  private url = `${base_url}/control`;
  private listaCambio = new Subject<Control[]>();
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Control[]>(this.url);
  }
  insert(se: Control) {
    return this.http.post(this.url, se);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva:Control[]) {
    this.listaCambio.next(listaNueva);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
    return this.http.get<Control>(`${this.url}/${id}`);
  }
  update(s:Control){
    return this.http.put(this.url,s);
  }
}
