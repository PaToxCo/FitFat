import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Tipo_Comida } from '../models/tipo_comida';
import { Dieta } from '../models/dieta';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class DietaService {
  private url = `${base_url}/dietas`;
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Dieta[]>(this.url);
  }
}
