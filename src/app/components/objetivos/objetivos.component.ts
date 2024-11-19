import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarobjetivosComponent } from './listarobjetivos/listarobjetivos.component';

@Component({
  selector: 'app-objetivos',
  standalone: true,
  imports: [RouterOutlet,ListarobjetivosComponent],
  templateUrl: './objetivos.component.html',
  styleUrl: './objetivos.component.css'
})
export class ObjetivosComponent {
  constructor(public route: ActivatedRoute){

  }
}
