import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ComidaService } from '../../../services/comida.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Comida } from '../../../models/comida';
import { Tipo_Comida } from '../../../models/tipo_comida';
import { Usuarios } from '../../../models/usuarios';
import { TipoComidaService } from '../../../services/tipo-comida.service';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-creaeditacomida',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  templateUrl: './creaeditacomida.component.html',
  styleUrls: ['./creaeditacomida.component.css'],
})
export class CreaeditacomidaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  comida: Comida = new Comida();
  listaTipoComida: Tipo_Comida[] = [];
  listaUsuarios: Usuarios[] = [];
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private cS: ComidaService,
    private tpS: TipoComidaService,
    private uS: UsuariosService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      fcodigo: [''],
      fnombre: ['', [Validators.required]],
      fcalorias: [0, [Validators.required, Validators.min(0)]],
      fproteinas: [0, [Validators.required, Validators.min(0)]],
      fcarbohidratos: [0, [Validators.required, Validators.min(0)]],
      fgrasas: [0, [Validators.required, Validators.min(0)]],
      fdescripcion: ['', [Validators.required]],
      fcomiFavo: [false],
      ftipoComida: ['', [Validators.required]],
      fusuario: ['', [Validators.required]],
    });
    this.cargarTiposComida();
    this.cargarUsuarios();
  }

  cargarTiposComida(): void {
    this.tpS.list().subscribe({
      next: (data) => {
        this.listaTipoComida = data;
      },
      error: (error) => {
        this.openSnackBar('Error al cargar tipos de comida.', 'Cerrar');
        console.error(error);
      },
    });
  }

  cargarUsuarios(): void {
    this.uS.list().subscribe({
      next: (data) => {
        this.listaUsuarios = data;
      },
      error: (error) => {
        this.openSnackBar('Error al cargar usuarios.', 'Cerrar');
        console.error(error);
      },
    });
  }

  insertar(): void {
    if (this.form.valid) {
      this.comida.nombre = this.form.value.fnombre;
      this.comida.calorias = this.form.value.fcalorias;
      this.comida.proteinas = this.form.value.fproteinas;
      this.comida.carbohidratos = this.form.value.fcarbohidratos;
      this.comida.grasas = this.form.value.fgrasas;
      this.comida.descripcion = this.form.value.fdescripcion;
      this.comida.comiFavo = this.form.value.fcomiFavo;
      this.comida.tipoComida.idTipComi = this.form.value.ftipoComida;
      this.comida.usuario.idUsuario = this.form.value.fusuario;

      console.log(this.comida);
      console.log(this.form.value);

      if (this.edicion) {
        this.comida.idComida = this.id;
        this.cS.update(this.comida).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
            this.router.navigate(['comidas']);
            this.openSnackBar('Comida actualizada con éxito.', 'Cerrar');
          });
        });
      } else {
        this.cS.insert(this.comida).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
            this.router.navigate(['comidas']);
            this.openSnackBar('Comida registrada con éxito.', 'Cerrar');
          });
        });
      }
    } else {
      this.openSnackBar(
        'Por favor, completa todos los campos requeridos.',
        'Cerrar'
      );
    }
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          fcodigo: new FormControl(data.idComida),
          fnombre: new FormControl(data.nombre),
          fcalorias: new FormControl(data.calorias),
          fproteinas: new FormControl(data.proteinas),
          fcarbohidratos: new FormControl(data.carbohidratos),
          fgrasas: new FormControl(data.grasas),
          fdescripcion: new FormControl(data.descripcion),
          fcomiFavo: new FormControl(data.comiFavo),
          ftipoComida: new FormControl(data.tipoComida.idTipComi, Validators.required),
          fusuario: new FormControl(data.usuario.idUsuario, Validators.required),
        });
      });
    }
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  cancelar() {
    this.router.navigate(['/comidas']);
  }
}
