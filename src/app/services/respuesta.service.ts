import { Injectable } from '@angular/core';
import { Consulta } from '../models/consulta';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Respuesta } from '../models/respuesta';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {

  private url = `${base_url}/respuesta`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Respuesta[]>(this.url);
  }
}
