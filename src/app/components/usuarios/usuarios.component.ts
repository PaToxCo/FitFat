import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarusuariosComponent } from './listarusuarios/listarusuarios.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [RouterOutlet, ListarusuariosComponent],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  
  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {
  }
}
