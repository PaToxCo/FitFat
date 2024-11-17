import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Tipo_Comida } from '../models/tipo_comida';
import { Observable, Subject } from 'rxjs';
import { ContarTiposPorCategoriaDTO } from '../models/dtos/ContarTiposPorCategoriaDTO';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class TipoComidaService {
  private url = `${base_url}/tipos-comida`;
  private listaCambio = new Subject<Tipo_Comida[]>();

  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Tipo_Comida[]>(this.url);
  }
  insert(ve:Tipo_Comida){
    return this.http.post(this.url, ve);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  setList(listaNueva:Tipo_Comida[]){
    this.listaCambio.next(listaNueva);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
    return this.http.get<Tipo_Comida>(`${this.url}/${id}`);
  }
  update(tp:Tipo_Comida){
    return this.http.put(this.url,tp);
  }
  contarTiposPorCategoria(): Observable<ContarTiposPorCategoriaDTO[]> {
   return this.http.get<ContarTiposPorCategoriaDTO[]>(`${this.url}/contar-por-categoria`); }
}
