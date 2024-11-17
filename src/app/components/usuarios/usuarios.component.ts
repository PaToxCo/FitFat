import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarusuariosComponent } from './listarusuarios/listarusuarios.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CardusuariosComponent } from "./listarusuarios/cardusuarios/cardusuarios.component";

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [RouterOutlet, ListarusuariosComponent, CardusuariosComponent],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  
  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {
  }
}
