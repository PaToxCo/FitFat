import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { RespuestaService } from '../../../services/respuesta.service';
import { ConsultaService } from '../../../services/consulta.service'; // Asegúrate de tener este servicio para obtener las consultas.
import { Respuesta } from '../../../models/respuesta';
import { Consulta } from '../../../models/consulta';

@Component({
  selector: 'app-creaeditarespuesta',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './creaeditarespuesta.component.html',
  styleUrls: ['./creaeditarespuesta.component.css'],
})
export class CreaEditaRespuestaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaConsultas: Consulta[] = [];
  respuesta: Respuesta = new Respuesta();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private respuestaService: RespuestaService,
    private consultaService: ConsultaService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((data: Params) => {
      this.id = data['idRespuesta'];
      this.edicion = data['idRespuesta'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      ffechaRespuesta: ['', Validators.required],
      fasunto: ['', Validators.required],
      fdescripcion: ['', Validators.required],
      fconsulta: ['', Validators.required],
    });

    // Obtener las consultas para el select
    this.consultaService.list().subscribe((data) => {
      this.listaConsultas = data;
    });
  }

  init() {
    if (this.edicion) {
      // Si es edición, obtener la respuesta por su id
      this.respuestaService.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          ffechaRespuesta: new FormControl(data.fechaRespuesta),
          fasunto: new FormControl(data.asunto),
          fdescripcion: new FormControl(data.descripcion),
          fconsulta: new FormControl(data.consulta.id), // Establecer la consulta asociada
        });
      });
    }
  }

  insertar(): void {
    if (this.form.valid) {
      this.respuesta.fechaRespuesta = this.form.value.ffechaRespuesta;
      this.respuesta.asunto = this.form.value.fasunto;
      this.respuesta.descripcion = this.form.value.fdescripcion;
      this.respuesta.consulta.id = this.form.value.fconsulta; // Asignamos la consulta asociada

      if (this.edicion) {
        this.respuestaService.modificar(this.respuesta).subscribe(() => {
          this.router.navigate(['/respuesta']);
          this.openSnackBar('Respuesta actualizada correctamente', 'Cerrar');
        });
      } else {
        this.respuestaService.post(this.respuesta).subscribe(() => {
          this.router.navigate(['/respuesta']);
          this.openSnackBar('Respuesta registrada correctamente', 'Cerrar');
        });
      }
    } else {
      this.openSnackBar('Por favor, complete todos los campos obligatorios.', 'Cerrar');
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  cancelar() {
    this.router.navigate(['/respuesta']);
  }
}