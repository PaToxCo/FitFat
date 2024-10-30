import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Control } from '../models/control';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  private url = `${base_url}/control`;
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Control[]>(this.url);
  }
}
