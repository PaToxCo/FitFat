import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CantidadcomidasfavportipoComponent } from "./comida/cantidadcomidasfavportipo/cantidadcomidasfavportipo.component";

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [RouterOutlet, CantidadcomidasfavportipoComponent],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {
  constructor(public route: ActivatedRoute) {}
}
