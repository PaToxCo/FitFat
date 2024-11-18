import { Component, ViewChild } from '@angular/core';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Objetivos } from '../../../models/objetivos';
import { ObjetivosService } from '../../../services/objetivos.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarobjetivos',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatInput,
    RouterLink,
    MatIconModule,
  ],
  templateUrl: './listarobjetivos.component.html',
  styleUrl: './listarobjetivos.component.css',
})
export class ListarobjetivosComponent {
  datasource: MatTableDataSource<Objetivos> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'accion01', 'accion02'];
  constructor(
    private oS: ObjetivosService, 
    private snackBar: MatSnackBar ) {
  }
  ngOnInit(): void {
    this.oS.list().subscribe((data) => {
      this.datasource.data = data;
      this.datasource = new MatTableDataSource(data);
      if (data.length == 0) {
        this.snackBar.open('No hay objetivos registrados', 'Cerrar', {
          duration: 5000,
        });
      }
    });
    this.oS.getList().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.oS.delete(id).subscribe((data) => {
      this.oS.list().subscribe((data) => {
        this.oS.setList(data);
        this.showDeleteSnackbar();
        if (data.length == 0) {
          this.showNoObjetivosSnackbar();
        }
      });
    });
  }
  ngAfterViewInit(): void {
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }
  showNoObjetivosSnackbar() {
    this.snackBar.open('No hay Objetivos registrados', 'Cerrar', {
      duration: 5000,
      verticalPosition: 'bottom', // Posición en la pantalla
      horizontalPosition: 'center',
    });
  }
  showDeleteSnackbar() {
    this.snackBar.open('Objetivo eliminado con éxito', 'Cerrar', {
      duration: 5000,
      verticalPosition: 'bottom', // Posición en la pantalla
      horizontalPosition: 'center',
    });
  }
}
