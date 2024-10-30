import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcontrolComponent } from './listarcontrol/listarcontrol.component';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [RouterOutlet, ListarcontrolComponent],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css'
})
export class ControlComponent implements OnInit {
    constructor(public route: ActivatedRoute) {
      
    }
    ngOnInit(): void {
      
    }
  }
