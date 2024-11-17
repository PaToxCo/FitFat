import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TipoComidaService } from '../../../services/tipo-comida.service';
import { Tipo_Comida } from '../../../models/tipo_comida';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creaeditatipo-comidas',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    CommonModule,
  ],
  templateUrl: './creaeditatipo-comidas.component.html',
  styleUrls: ['./creaeditatipo-comidas.component.css'],
})
export class CreaeditatipoComidasComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  tipoComida: Tipo_Comida = new Tipo_Comida();
  //modificar
  id: number = 0;
  edicion: boolean = false;

  listaTipo: { value: string; viewValue: string }[] = [
    { value: 'Desayuno', viewValue: 'Desayuno' },
    { value: 'Almuerzo', viewValue: 'Almuerzo' },
    { value: 'Cena', viewValue: 'Cena' },
  ];

  listaCategoria: { value: string; viewValue: string }[] = [
    { value: 'Entrante', viewValue: 'Entrante' },
    { value: 'Plato Principal', viewValue: 'Plato Principal' },
    { value: 'Postre', viewValue: 'Postre' },
    { value: 'Bebida', viewValue: 'Bebida' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private tS: TipoComidaService,
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
    this.form = this.formBuilder.group({
      fdescripcion: ['', [Validators.required]],
      ftipo: ['', [Validators.required]],
      fcategoria: ['', [Validators.required]],
    });
  }

  insertar(): void {
    if (this.form.valid) {
      this.tipoComida.descripcion = this.form.value.fdescripcion;
      this.tipoComida.tipo = this.form.value.ftipo;
      this.tipoComida.categoria = this.form.value.fcategoria;
  
      if (this.edicion) {
        this.tipoComida.idTipComi = this.id;
        this.tS.update(this.tipoComida).subscribe(() => {
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
            this.router.navigate(['tipos-comida']);
            this.openSnackBar('Tipo de comida actualizado con éxito.', 'Cerrar');
          });
        });
      } else {
        this.tS.insert(this.tipoComida).subscribe(() => {
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
            this.router.navigate(['tipos-comida']);
            this.openSnackBar('Tipo de comida registrado con éxito.', 'Cerrar');
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
      this.tS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          fdescripcion: new FormControl(data.descripcion),
          ftipo: new FormControl(data.tipo),
          fcategoria: new FormControl(data.categoria),
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
    this.router.navigate(['/tipos-comida']);
  }
}
