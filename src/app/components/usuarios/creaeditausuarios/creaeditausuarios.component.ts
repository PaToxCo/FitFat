import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuarios } from '../../../models/usuarios';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creaeditausuarios',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    CommonModule
  ],
  templateUrl: './creaeditausuarios.component.html',
  styleUrls: ['./creaeditausuarios.component.css'],
})
export class CreaeditausuariosComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuarios = new Usuarios();
  //modificar
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuariosService,
    private router: Router,
    private snackBar: MatSnackBar,
    //modificar
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    //modificar
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
      //traer data de la tabla al formulario
    });
    //
    this.form = this.formBuilder.group({
      fcorreo: ['', [Validators.required, Validators.email]],
      fcontrasena: ['', [Validators.required]],
      fcontrasena2: ['', [Validators.required]],
      fnombre: ['', [Validators.required]],
      fapellidos: ['', [Validators.required]],
      fusuario: ['', [Validators.required]],
      fcelular: [null, [Validators.required]],
      fdireccion: ['', [Validators.required]],
    });
  }

  insertar(): void {
    if (this.form.valid) {
      this.usuario.correo = this.form.value.fcorreo;
      this.usuario.contrasena = this.form.value.fcontrasena;
      this.usuario.contrasena2 = this.form.value.fcontrasena2;
      this.usuario.nombre = this.form.value.fnombre;
      this.usuario.apellidos = this.form.value.fapellidos;
      this.usuario.usuario = this.form.value.fusuario;
      this.usuario.celular = this.form.value.fcelular;
      this.usuario.direccion = this.form.value.fdireccion;
      this.usuario.enabled = true;

      if (this.edicion) {
        // Actualizar el Usuario si estamos en modo edición
        this.usuario.idUsuario = this.id;
        this.uS.update(this.usuario).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
            this.router.navigate(['usuarios']);
            this.openSnackBar('Usuario actualizado con éxito.', 'Cerrar');
          });
        });
      } else {
        // Insertar un nuevo Usuario si no estamos en modo edición
        this.uS.insert(this.usuario).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
            this.router.navigate(['usuarios']);
            this.openSnackBar('Usuario registrado con éxito.', 'Cerrar');
          });
        });
      }
    } else {
      this.openSnackBar(
        'Por favor, complete todos los campos requeridos.',
        'Cerrar'
      );
    }
  }
  //modificar
  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          fcorreo: new FormControl(data.correo),
          fnombre: new FormControl(data.nombre),
          fapellidos: new FormControl(data.apellidos),
          fusuario: new FormControl(data.usuario),
          fcelular: new FormControl(data.celular),
          fdireccion: new FormControl(data.direccion),
          fcontrasena: new FormControl(data.contrasena),
          fcontrasena2: new FormControl(data.contrasena2),
        });
      });
    }
  }
  cancelar() {
    this.router.navigate(['/usuarios']);
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
