import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcomidaComponent } from './listarcomida/listarcomida.component';

@Component({
  selector: 'app-comida',
  standalone: true,
  imports: [RouterOutlet, ListarcomidaComponent],
  templateUrl: './comida.component.html',
  styleUrl: './comida.component.css',
})
export class ComidaComponent {
  constructor(public route: ActivatedRoute) {}
}
