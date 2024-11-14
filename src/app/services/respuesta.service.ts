import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Respuesta } from '../models/respuesta';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class RespuestaService {
  private url = `${base_url}/respuesta`;
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Respuesta[]>(this.url+"/listar");
  }
  post(r:Respuesta){
    return this.http.post<Respuesta>(this.url+"/agregar",r);
  }
  delete(id:number){
    return this.http.delete<Respuesta>(this.url+"/delete"+"/"+id.toString());
  }
  modificar(r:Respuesta){
  return this.http.put<Respuesta>(this.url+"/actualizar", r);
  }
}
