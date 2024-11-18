import { Injectable } from '@angular/core';
import { Consulta } from '../models/consulta';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Respuesta } from '../models/respuesta';
import { Observable, Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {
  private url = `${base_url}/respuesta`;
  private listaCambio = new Subject<Respuesta[]>();
  constructor(private http: HttpClient) { }
  list() : Observable<Respuesta[]>{
    return this.http.get<Respuesta[]>(this.url+"/listar");
  }
  post(r:Respuesta){
    return this.http.post<Respuesta>(this.url+"/agregar",r);
  }
  getList(): Observable<Respuesta[]> {
    return this.listaCambio.asObservable();
  }
  update(respuesta: Respuesta): Observable<Respuesta> {
    return this.http.put<Respuesta>(this.url, respuesta);
  }
  delete(id:number){
    return this.http.delete<Respuesta>(this.url+"/delete"+"/"+id.toString());
  }
  modificar(r:Respuesta){
  return this.http.put<Respuesta>(this.url+"/actualizar", r);
  }
  listId(id: number): Observable<Respuesta> {
    return this.http.get<Respuesta>(`${this.url}/${id}`);
  }
  listarPorConsulta(idConsulta: number): Observable<Respuesta[]> {
    return this.http.get<Respuesta[]>(`${this.url}/consulta/${idConsulta}`);
  }
}
