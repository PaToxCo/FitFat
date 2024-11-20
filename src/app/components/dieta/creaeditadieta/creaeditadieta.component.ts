import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Dieta } from '../../../models/dieta';
import { Usuarios } from '../../../models/usuarios';
import { DietaService } from '../../../services/dieta.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-creaeditadieta',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,CommonModule
  ],
  templateUrl: './creaeditadieta.component.html',
  styleUrl: './creaeditadieta.component.css'
})
export class CreaeditadietaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaUsuarios: Usuarios[] = [];
  dieta: Dieta = new Dieta();
  id: number = 0;
  edicion: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private dS: DietaService,
    private uS: UsuariosService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(){
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      fcodigo: [''],
      fnombre: ['', Validators.required],
      fduracion: ['', Validators.required],
      fusuario: ['', [Validators.required]],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.dieta.idDieta = this.form.value.fcodigo;
      this.dieta.nombre = this.form.value.fnombre;
      this.dieta.duracion = this.form.value.fduracion;
      this.dieta.usuario.idUsuario = this.form.value.fusuario;

      console.log(this.dieta);

      this.dS.insert(this.dieta).subscribe((data) => {
        this.dS.list().subscribe((data) => {
          this.dS.setList(data);
          this.router.navigate(['dietas']);
          const mensaje = this.edicion ? 'Dieta actualizada con éxito' : 'Dieta registrada con éxito';
           this.openSnackBar(mensaje, 'Cerrar');
        });
      });
    }
  }
  init() {
    if (this.edicion) {
      this.dS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          fcodigo: [data.idDieta, Validators.required],
          fnombre: [data.nombre, Validators.required],
          fduracion: [data.duracion, Validators.required],
          fusuario: [data.usuario.idUsuario, Validators.required],
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
    this.router.navigate(['/dietas']);
  }
}
