import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Comida } from '../models/comida';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ComidaService {

  private url = `${base_url}/comidas`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Comida[]>(this.url);
  }
}
