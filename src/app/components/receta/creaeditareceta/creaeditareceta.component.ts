import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Comida } from '../../../models/comida';
import { Receta } from '../../../models/receta';
import { RecetaService } from '../../../services/receta.service';
import { ComidaService } from '../../../services/comida.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creaeditareceta',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './creaeditareceta.component.html',
  styleUrl: './creaeditareceta.component.css'
})
export class CreaeditarecetaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaComida: Comida[] = [];
  receta: Receta = new Receta();
  isChecked: boolean = false;
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private rS: RecetaService,
    private cS: ComidaService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      fcodigo: [''],
      fnombre: ['', Validators.required],
      fdescripcion: ['', Validators.required],
      finstrucciones: ['', Validators.required],
      fcomida: ['', Validators.required],
    });

    this.cS.list().subscribe((data) => {
      this.listaComida = data;
    });
  }

  insertar(): void {
    if (this.form.valid) {
      this.receta.idReceta = this.form.value.fcodigo;
      this.receta.nombre = this.form.value.fnombre;
      this.receta.descripcion = this.form.value.fdescripcion;
      this.receta.instrucciones = this.form.value.finstrucciones;
      this.receta.comida.idComida = this.form.value.fcomida;

      if (this.edicion) {
        // Actualización de objetivo
        this.rS.update(this.receta).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
            this.openSnackBar('Receta actualizada con éxito', 'Cerrar'); // Mensaje de éxito
            this.router.navigate(['recetas']);
          });
        });
      } else {
        // Inserción de nuevo objetivo
        this.rS.insert(this.receta).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
            this.router.navigate(['recetas']);
            this.openSnackBar('Receta registrada correctamente', 'Cerrar');
          });
        });
      }
    } else {
      if (this.form.controls['fnombre'].invalid) {
        this.openSnackBar('Por favor, complete el nombre de la receta.', 'Cerrar');
      }
      if (this.form.controls['fdescripcion'].invalid) {
        this.openSnackBar('Por favor, complete la descripción de la receta.', 'Cerrar');
      }
      if (this.form.controls['finstrucciones'].invalid) {
        this.openSnackBar('Por favor, complete las instrucciones de la receta.', 'Cerrar');
      }
      if (this.form.controls['fcomida'].invalid) {
        this.openSnackBar('Por favor, seleccione una comida.', 'Cerrar');
      }
    }
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          fcodigo: new FormControl(data.idReceta),
          fnombre: new FormControl(data.nombre, Validators.required),
          fdescripcion: new FormControl(data.descripcion, Validators.required),
          finstrucciones: new FormControl(data.instrucciones, Validators.required),
          fcomida: new FormControl(data.comida.idComida, Validators.required),
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
    this.router.navigate(['/recetas']);
  }
}
