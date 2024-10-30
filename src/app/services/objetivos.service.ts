import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Objetivos } from '../models/objetivos';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class ObjetivosService {
  private url = `${base_url}/objetivos`;

  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Objetivos[]>(this.url);
  }
}
