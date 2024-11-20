import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  NativeDateAdapter,
} from '@angular/material/core';
import moment from 'moment';
import { Usuarios } from '../../../models/usuarios';
import { Objetivos } from '../../../models/objetivos';
import { ObjetivosService } from '../../../services/objetivos.service';
import { UsuariosService } from '../../../services/usuarios.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-creaeditaobjetivos',
  standalone: true,
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './creaeditaobjetivos.component.html',
  styleUrl: './creaeditaobjetivos.component.css'
})
export class CreaeditaobjetivosComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  objetivo: Objetivos = new Objetivos();
  listaUsuario: Usuarios[] = [];
  id: number = 0;
  edicion: boolean = false;

  listaTipoObjetivo: { value: string; viewValue: string }[] = [  
    { value: 'Deficit Calorico', viewValue: 'Deficit Calorico' },  
    { value: 'Volumen', viewValue: 'Volumen' },  
    { value: 'Recomposición corporal', viewValue: 'Recomposición corporal'},  
  ];

  constructor(
    private formBuilder: FormBuilder,
    private oS: ObjetivosService,
    private uS: UsuariosService,
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
      fdescripcion: ['', Validators.required],
      ftipo: ['', Validators.required],
      ffecha: this.formBuilder.group(
        {
          fstartdate: ['', Validators.required],
          fenddate: ['', Validators.required],
        },
        { validators: this.dateRangeValidator }
      ),
      festado: ['', Validators.required],
      fusuario: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuario = data;
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.objetivo.idObjetivos = this.form.value.fcodigo;
      this.objetivo.descripcion = this.form.value.fdescripcion;
      this.objetivo.tipo_objetivo = this.form.value.ftipo;
      const phfechaControl = this.form.get('ffecha');
      if (phfechaControl instanceof FormGroup) {
        this.objetivo.fecha_inicio = phfechaControl.get('fstartdate')?.value;
        this.objetivo.fecha_fin = phfechaControl.get('fenddate')?.value;
      }
      this.objetivo.estado = this.form.value.festado;
      this.objetivo.usuario.idUsuario = this.form.value.fusuario;

      console.log(this.objetivo);

      if (this.edicion) {
        this.oS.update(this.objetivo).subscribe((data) => {
          this.oS.list().subscribe((data) => {
            this.oS.setList(data);
            this.openSnackBar('Objetivo actualizado con éxito', 'Cerrar'); 
            this.router.navigate(['objetivos']);
          });
        });
      } else {
        this.oS.insert(this.objetivo).subscribe((data) => {
          this.oS.list().subscribe((data) => {
            this.oS.setList(data);
            this.openSnackBar('Objetivo registrado con éxito', 'Cerrar'); 
            this.router.navigate(['objetivos']);
          });
        });
      }
    } else {
      if (this.form.get('phfecha')?.hasError('dateRangeInvalid')) {
        this.openSnackBar(
          'La fecha fin no puede ser menor a la fecha inicio, ni el inicio mayor a la de fin.',
          'Cerrar'
        );
      }
      else{
        this.openSnackBar(
          'Por favor verifica que todos los campos estén completos.',
          'Cerrar'
        );
      }
    }
  }
  init() {
    if (this.edicion) {
      this.oS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          fcodigo: new FormControl(data.idObjetivos),
          fdescripcion: new FormControl(data.descripcion),
          ftipo: new FormControl(data.tipo_objetivo),
          ffecha: new FormGroup({
            fstartdate: new FormControl(new Date(data.fecha_inicio), Validators.required),
            fenddate: new FormControl(new Date(data.fecha_fin), Validators.required),
          }, { validators: this.dateRangeValidator }),
          festado: new FormControl(data.estado),
          fusuario: new FormControl(data.usuario, Validators.required),
        });
      });
    }
  }
  
  cancelar() {
    this.router.navigate(['/objetivos']);
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  getPhFechaGroup(): FormGroup {
    return this.form.get('ffecha') as FormGroup;
  }

  dateRangeValidator(group: AbstractControl): { [key: string]: any } | null {
    const start = group.get('fstartdate')?.value;
    const end = group.get('fenddate')?.value;
    return start && end && start > end ? { dateRangeInvalid: true } : null;
  }
  
}