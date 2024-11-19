import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
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
import { Control } from '../../../models/control';
import { Dieta } from '../../../models/dieta';
import { Usuarios } from '../../../models/usuarios';
import { DietaService } from '../../../services/dieta.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { ControlService } from '../../../services/control.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creaeditacontrol',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './creaeditacontrol.component.html',
  styleUrl: './creaeditacontrol.component.css'
})
export class CreaeditacontrolComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  listaDieta: Dieta[] = [];
  listaUsuarios: Usuarios[] = [];
  control: Control = new Control();
  isChecked: boolean = false;
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private dS: DietaService,
    private uS: UsuariosService,
    private cS: ControlService,
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
      fcodigo: [''],
      fpeso: ['', Validators.required],
      ftalla: ['', Validators.required],
      fedad: ['', Validators.required],
      fgenero: ['', Validators.required],
      fdieta: ['', Validators.required],
      fusuario: ['', Validators.required],
      ffecha: ['', [Validators.required, this.noFutureDate]],
    });
    this.dS.list().subscribe((data) => {
      this.listaDieta = data;
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.control.idControl = this.form.value.fcodigo;
      this.control.peso = this.form.value.fpeso;
      this.control.talla = this.form.value.ftalla;
      this.control.edad = this.form.value.fedad;
      this.control.genero = this.form.value.fgenero;
      this.control.dieta.idDieta = this.form.value.fdieta;
      this.control.usuario.idUsuario = this.form.value.fusuario;
      this.control.fecha = this.form.value.ffecha;

      console.log(this.control);

      this.cS.insert(this.control).subscribe((data) => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
          this.router.navigate(['control']);
        });
      });
    } else {
      if (this.form.controls['ffecha'].hasError('futureDate')) {
        this.openSnackBar('No se puede seleccionar una fecha futura', 'Cerrar');
      }
    }
  }
  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          fcodigo: new FormControl(data.idControl),
          fpeso: new FormControl(data.peso),
          ftalla: new FormControl(data.talla),
          fedad: new FormControl(data.edad),
          fgenero: new FormControl(data.genero),
          fdieta: new FormControl(data.dieta),
          fusuario: new FormControl(data.usuario),
          ffecha: new FormControl(data.fecha),
        });
      });
    }
  }
  noFutureDate(control: AbstractControl): { [key: string]: any } | null {
    const inputDate = moment(control.value, 'DD/MM/YYYY');
    const today = moment();
    return inputDate.isAfter(today) ? { futureDate: true } : null;
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
  cancelar() {
    this.router.navigate(['/control']);
  }
}
