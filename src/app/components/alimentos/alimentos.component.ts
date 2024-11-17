import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListaralimentosComponent } from './listaralimentos/listaralimentos.component';

@Component({
  selector: 'app-alimentos',
  standalone: true,
  imports: [RouterOutlet, ListaralimentosComponent],
  templateUrl: './alimentos.component.html',
  styleUrl: './alimentos.component.css'
})
export class AlimentosComponent {
  constructor(public route: ActivatedRoute) {

  }
}
