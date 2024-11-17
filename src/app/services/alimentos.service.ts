import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Alimentos } from '../models/alimentos';
import { Observable, Subject } from 'rxjs';
import { TotalAlimentosDTO } from '../models/dtos/TotalAlimentosDTO';
import { TotalCaloriasDTO } from '../models/dtos/TotalCaloriasDTO';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class AlimentosService {
  private url = `${base_url}/alimentos`;

  private listaCambio = new Subject<Alimentos[]>();
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Alimentos[]>(this.url);
  }
  insert(se: Alimentos) {
    return this.http.post(this.url, se);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva:Alimentos[]) {
    this.listaCambio.next(listaNueva);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
    return this.http.get<Alimentos>(`${this.url}/${id}`);
  }
  update(s:Alimentos){
    return this.http.put(this.url,s);
  }
  totalAlimentos(): Observable<TotalAlimentosDTO[]> {
    return this.http.get<TotalAlimentosDTO[]>(`${this.url}/total-alimentos`);
  }

  totalCalorias(): Observable<TotalCaloriasDTO[]> {
    return this.http.get<TotalCaloriasDTO[]>(`${this.url}/total-calorias`);
  }
}
