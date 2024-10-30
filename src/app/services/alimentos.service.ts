import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Alimentos } from '../models/alimentos';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class AlimentosService {
  private url = `${base_url}/alimentos`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Alimentos[]>(this.url);
  }
}
