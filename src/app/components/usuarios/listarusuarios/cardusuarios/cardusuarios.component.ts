import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../../services/usuarios.service';
import { MatCardModule } from '@angular/material/card';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cardusuarios',
  standalone: true,
  imports: [MatCardModule, CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cardusuarios.component.html',
  styleUrls: ['./cardusuarios.component.css']
})
export class CardusuariosComponent implements OnInit {
  usuario: any;

  constructor(
    private usuarioService: UsuariosService,
    private cdRef: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarioLogueado();
  }

  obtenerUsuarioLogueado(): void {
    this.usuarioService.obtenerUsuarioLogueado().subscribe(
      (data) => {
        console.log('Datos del usuario:', data);
        this.usuario = data;  
        console.log('Usuario cargado:', this.usuario);
        this.cdRef.detectChanges(); 
      },
      (error: HttpErrorResponse) => {
        console.error('Error al obtener usuario logueado:', error);
        alert('Error al obtener usuario logueado');
      }
    );
  }
}
