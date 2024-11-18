import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { Alimentos } from '../../../models/alimentos';
import { AlimentosService } from '../../../services/alimentos.service';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listaralimentos',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatInput,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './listaralimentos.component.html',
  styleUrl: './listaralimentos.component.css',
})
export class ListaralimentosComponent {
  datasource: MatTableDataSource<Alimentos> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7','c8','accion01','accion02'];
  constructor(
    private aS: AlimentosService,
    private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.aS.list().subscribe((data) => {
      this.datasource.data = data;
      this.datasource = new MatTableDataSource(data);
      if (data.length == 0) {
        this.snackBar.open('No hay alimentos registrados', 'Cerrar', {
          duration: 5000,
        });
      }
    });
    this.aS.getList().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });
  }
    
  eliminar(id: number) {
    this.aS.delete(id).subscribe((data) => {
      this.aS.list().subscribe((data) => {
        this.aS.setList(data);
        this.showDeleteSnackbar();
        if (data.length == 0) {
          this.showNoAlimentosSnackbar();
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
  showNoAlimentosSnackbar() {
    this.snackBar.open('No hay alimentos registrados', 'Cerrar', {
      duration: 5000,
      verticalPosition: 'bottom', // Posición en la pantalla
      horizontalPosition: 'center',
    });
  }
  showDeleteSnackbar() {
    this.snackBar.open('Alimento eliminado correctamente', 'Cerrar', {
      duration: 5000,
      verticalPosition: 'bottom', // Posición en la pantalla
      horizontalPosition: 'center',
    });
  }
}
