import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarconsultaComponent } from './listarconsulta/listarconsulta.component';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [RouterOutlet, ListarconsultaComponent],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.css'
})
export class ConsultaComponent implements OnInit{

  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {
  }

}
