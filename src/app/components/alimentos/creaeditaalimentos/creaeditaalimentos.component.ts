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
import moment from 'moment';
import { CommonModule } from '@angular/common';
import { Receta } from '../../../models/receta';
import { Dieta } from '../../../models/dieta';
import { Alimentos } from '../../../models/alimentos';
import { DietaService } from '../../../services/dieta.service';
import { RecetaService } from '../../../services/receta.service';
import { AlimentosService } from '../../../services/alimentos.service';
@Component({
  selector: 'app-creaeditaalimentos',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
  ],  templateUrl: './creaeditaalimentos.component.html',
  styleUrl: './creaeditaalimentos.component.css'
})
export class CreaeditaalimentosComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaDieta: Dieta[] = [];
  listaReceta: Receta[] = [];
  alimentos: Alimentos = new Alimentos();
  isChecked: boolean = false;
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private dS: DietaService,
    private rS: RecetaService,
    private aS: AlimentosService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      fnombre: ['', [Validators.required]],
      fcalorias: [0, [Validators.required]],
      fproteinas: [0, [Validators.required]],
      fcarbohidratos: [0, [Validators.required]],
      fgrasa: [0, [Validators.required]],
      fdieta: ['', [Validators.required]],
      freceta: ['', [Validators.required]],
    });
  
    this.dS.list().subscribe((data) => {
      this.listaDieta = data;
    });
  
    this.rS.list().subscribe((data) => {
      this.listaReceta = data;
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.alimentos.idAlimentos = this.form.value.fcodigo;
      this.alimentos.nombre = this.form.value.fnombre;
      this.alimentos.calorias = this.form.value.fcalorias;
      this.alimentos.proteinas = this.form.value.fproteinas;
      this.alimentos.carbohidratos = this.form.value.fcarbohidratos;
      this.alimentos.grasas = this.form.value.fgrasa;
      this.alimentos.dieta.idDieta = this.form.value.fdieta;
      this.alimentos.receta.idReceta = this.form.value.freceta;
      if (this.edicion) {
        // Actualización de alimentos
        this.aS.update(this.alimentos).subscribe((data) => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
            this.router.navigate(['alimentos']);
            this.openSnackBar('Alimento actualizado con éxito', 'Cerrar'); // Mensaje de éxito
          });
        });
      } else {
        // Inserción de nuevo alimento
        this.aS.insert(this.alimentos).subscribe((data) => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
            this.router.navigate(['alimentos']);
            this.openSnackBar('Alimento registrado con éxito', 'Cerrar'); // Mensaje de éxito
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

  init() {
    if (this.edicion) {
      this.aS.listId(this.id).subscribe((data) => { 
        this.form = new FormGroup({
          fcodigo: new FormControl(data.idAlimentos),
          fnombre: new FormControl(data.nombre),
          fcalorias: new FormControl(data.calorias || 0),
          fproteinas: new FormControl(data.proteinas || 0),
          fcarbohidratos: new FormControl(data.carbohidratos || 0),
          fgrasa: new FormControl(data.grasas || 0),
          fdieta: new FormControl(data.dieta, Validators.required),
          freceta: new FormControl(data.receta,Validators.required),
        });
      });
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  cancelar() {
    this.router.navigate(['/alimentos']);
  }
}
