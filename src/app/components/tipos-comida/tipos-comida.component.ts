import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartipocomidaComponent } from './listartipocomida/listartipocomida.component';

@Component({
  selector: 'app-tipos-comida',
  standalone: true,
  imports: [RouterOutlet,ListartipocomidaComponent],
  templateUrl: './tipos-comida.component.html',
  styleUrl: './tipos-comida.component.css'
})
export class TiposComidaComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {
    
  }
}
