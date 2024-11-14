import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConsultaService } from '../../../services/consulta.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Consulta } from '../../../models/consulta';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-creaeditaconsulta',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDatepicker,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './creaeditaconsulta.component.html',
  styleUrls: ['./creaeditaconsulta.component.css'],
})
export class CreaEditaConsultaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  consulta: Consulta = new Consulta();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private cS: ConsultaService,
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
      ffechaConsulta: ['', [Validators.required]],
      fasunto: ['', [Validators.required]],
      fdescripcion: ['', [Validators.required]],
    });
    console.log('Form valid:', this.form.valid);
  }

  init(): void {
    if (this.edicion) {
      this.cS.list().subscribe((data) => {
        const consulta = data.find((c) => c.id === this.id);
        if (consulta) {
          this.form.patchValue({
            ffechaConsulta: consulta.fechaConsulta,
            fasunto: consulta.asunto,
            fdescripcion: consulta.descripcion,
          });
        }
      });
    }
  }

  insertar(): void {
    if (this.form.valid) {
      this.consulta.fechaConsulta = this.form.value.ffechaConsulta;
      this.consulta.asunto = this.form.value.fasunto;
      this.consulta.descripcion = this.form.value.fdescripcion;

      if (this.edicion) {
        this.consulta.id = this.id;
        this.cS.modificar(this.consulta).subscribe(() => {
          this.router.navigate(['consultas']);
          this.openSnackBar('Consulta actualizada con éxito.', 'Cerrar');
        });
      } else {
        this.cS.post(this.consulta).subscribe(() => {
          this.router.navigate(['consultas']);
          this.openSnackBar('Consulta registrada con éxito.', 'Cerrar');
        });
      }
    } else {
      this.openSnackBar('Por favor, completa todos los campos requeridos.', 'Cerrar');
    }
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  cancelar(): void {
    this.router.navigate(['/consultas']);
  }
}