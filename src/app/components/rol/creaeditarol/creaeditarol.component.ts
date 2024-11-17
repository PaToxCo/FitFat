import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuarios } from '../../../models/usuarios';

@Component({
  selector: 'app-creaeditarol',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './creaeditarol.component.html',
  styleUrl: './creaeditarol.component.css',
})
export class CreaeditarolComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  rol: Rol = new Rol();
  id: number = 0;
  edicion: boolean = false;
  listaUsuario: Usuarios[] =[]

  constructor(
    private formBuilder: FormBuilder,
    private rS: RolService,
    private uS: UsuariosService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      rcodigo: [''],
      rdescripcion: ['', Validators.required],
      rusuario: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuario = data;
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.rol.idRol = this.form.value.rcodigo;
      this.rol.descripcion = this.form.value.rdescripcion;
      this.rol.usuario.idUsuario = this.form.value.rusuario;

      console.log(this.rol);

      this.rS.insert(this.rol).subscribe((data) => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
          this.router.navigate(['roles']);
          const mensaje = this.edicion ? 'Dieta actualizada exitosamente' : 'Dieta registrada exitosamente';
          this.openSnackBar(mensaje, 'Cerrar');
        });
      });
    }
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          rcodigo: new FormControl(data.idRol),
          rdescripcion: new FormControl(data.descripcion, Validators.required),
          rusuario: new FormControl(data.usuario.idUsuario, Validators.required),
        });
      });
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
  cancelar() {
    this.router.navigate(['/roles']);
  }
}
