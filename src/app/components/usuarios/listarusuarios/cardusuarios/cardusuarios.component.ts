import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../../services/usuarios.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cardusuarios',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cardusuarios.component.html',
  styleUrls: ['./cardusuarios.component.css']
})
export class CardusuariosComponent implements OnInit {
  usuario: any;

  constructor(private usuarioService: UsuariosService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerUsuarioLogueado();
  }

  // Método para obtener los datos del usuario logueado
  obtenerUsuarioLogueado(): void {
    this.usuarioService.obtenerUsuarioLogueado().subscribe(
      (data) => {
        console.log('Datos del usuario:', data);
        this.usuario = {
          username: data.username // Asignamos solo el 'username'
        };
        console.log('Usuario cargado:', this.usuario);
      },
      (error: HttpErrorResponse) => {
        console.error('Error al obtener usuario logueado:', error);
        alert('Error al obtener usuario logueado');
      }
    );
  }

  // Método para navegar a la página de detalles del usuario
  verDetalles(): void {
    if (this.usuario && this.usuario.username) {
      // Navegar a la ruta 'user-details/:username'
      this.router.navigate(['/usuarios/user-details', this.usuario.username]);
    } else {
      console.error('Usuario no encontrado');
    }
  }
  
  
}
