import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { UsuariosService } from '../../../../services/usuarios.service';
import { DietaService } from '../../../../services/dieta.service';
import { Dieta } from '../../../../models/dieta';

@Component({
  selector: 'app-carddieta',
  standalone: true,
  imports: [MatCardModule, CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './carddieta.component.html',
  styleUrls: ['./carddieta.component.css']
})
export class CarddietaComponent implements OnInit {

  dieta: Dieta | null = null;
  usuario: any;

  constructor(
    private usuarioService: UsuariosService,
    private dietaService: DietaService,
    private cdRef: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarioLogueado();
    this.obtenerDieta();
  }

  obtenerUsuarioLogueado(): void {
    this.usuarioService.obtenerUsuarioLogueado().subscribe(
      (data) => {
        this.usuario = data;  
        this.cdRef.detectChanges(); 
      },
      (error: HttpErrorResponse) => {
        console.error('Error al obtener usuario logueado:', error);
        alert('Error al obtener usuario logueado');
      }
    );
  }

  obtenerDieta(): void {
    const id = 1;
    this.dietaService.listId(id).subscribe(
      (data: Dieta) => {
        this.dieta = data;
        this.cdRef.detectChanges(); 
      },
      (error: HttpErrorResponse) => {
        console.error('Error al obtener dieta:', error);
        alert('Error al obtener dieta');
      }
    );
  }
}