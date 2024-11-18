import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Consulta } from '../models/consulta';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private url = `${base_url}/consulta`;
  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<Consulta[]>(this.url+"/listar");
  }
  post(c:Consulta){
    return this.http.post<Consulta>(this.url+"/agregar",c);
  }
  delete(id:number){
    return this.http.delete<Consulta>(this.url+"/delete"+"/"+id.toString());
  }
  modificar(c:Consulta){
  return this.http.put<Consulta>(this.url+"/actualizar", c);
  }
}
