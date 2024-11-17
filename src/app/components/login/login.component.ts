import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtRequest } from '../../models/jwt-request';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';  // Importa HttpErrorResponse

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar,
    private appComponent: AppComponent // Inyectar el AppComponent
  ) {}
  
  usuario: string = '';
  contrasena: string = '';
  mensaje: string = '';
  
  ngOnInit(): void {}

  login() {
    // Mostrar el preloader
    this.appComponent.showLoader();

    let request = new JwtRequest();
    request.usuario = this.usuario;
    request.contrasena = this.contrasena;

    this.loginService.login(request).subscribe(
      (data: any) => {
        // Guardar el token en sessionStorage
        sessionStorage.setItem('token', data.jwttoken);
        this.router.navigate(['bienvenida']);
        // Ocultar el preloader
        this.appComponent.hideLoader();
      },
      (error: HttpErrorResponse) => {  // Especifica el tipo 'HttpErrorResponse'
        this.mensaje = 'Credenciales incorrectas!!!';
        this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
        // Ocultar el preloader en caso de error
        this.appComponent.hideLoader();
      }
    );
  }
}
