import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Dieta } from '../../../models/dieta';
import { DietaService } from '../../../services/dieta.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInput, MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listardieta',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatInput,
    RouterLink,
    MatIcon,
    CommonModule,
    MatSnackBarModule,
  ],
  templateUrl: './listardieta.component.html',
  styleUrl: './listardieta.component.css',
})
export class ListardietaComponent {
  datasource: MatTableDataSource<Dieta> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'accion01', 'accion02'];
  contador: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dS: DietaService, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.dS.list().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
      this.contador = data.length;
      if (this.contador == 0) {
        this.showNoDietasSnackbar();
      }
    });
    this.dS.getList().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
      this.contador = data.length;
    });
  }
  eliminar(id: number) {
    this.dS.delete(id).subscribe((data) => {
      this.dS.list().subscribe((data) => {
        this.dS.setList(data);
        this.contador = data.length;
        this.showDeleteSnackbar();
        if (this.contador == 0) {
          this.showNoDietasSnackbar();
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
  showNoDietasSnackbar() {
    this.snackBar.open('No hay dietas registradas', 'Cerrar', {
      duration: 5000,
      verticalPosition: 'bottom', // Posición en la pantalla
      horizontalPosition: 'center',
    });
  }
  showDeleteSnackbar() {
    this.snackBar.open('Eliminado correctamente', 'Cerrar', {
      duration: 5000,
      verticalPosition: 'bottom', // Posición en la pantalla
      horizontalPosition: 'center',
    });
  }
}
