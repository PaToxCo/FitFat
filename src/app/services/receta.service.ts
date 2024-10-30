import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Receta } from '../models/receta';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  private url = `${base_url}/recetas`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Receta[]>(this.url);
  }
}
