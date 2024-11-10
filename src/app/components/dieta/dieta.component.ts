import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListardietaComponent } from './listardieta/listardieta.component';

@Component({
  selector: 'app-dieta',
  standalone: true,
  imports: [RouterOutlet,ListardietaComponent],
  templateUrl: './dieta.component.html',
  styleUrl: './dieta.component.css'
})
export class DietaComponent {
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {
    
  }
}
