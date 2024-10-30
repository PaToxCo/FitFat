import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Tipo_Comida } from '../models/tipo_comida';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class TipoComidaService {
  private url = `${base_url}/tipos-comida`;
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Tipo_Comida[]>(this.url);
  }
}
