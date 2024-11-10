import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Tipo_Comida } from '../models/tipo_comida';
import { Dieta } from '../models/dieta';
import { Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class DietaService {
  private url = `${base_url}/dietas`;
  private listaCambio = new Subject<Dieta[]>();
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Dieta[]>(this.url);
  }
  insert(r: Dieta) {
    return this.http.post(this.url, r);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva:Dieta[]) {
    this.listaCambio.next(listaNueva);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
    return this.http.get<Dieta>(`${this.url}/${id}`);
  }
  update(r:Dieta){
    return this.http.put(this.url,r);
  }
}
