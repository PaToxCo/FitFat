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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

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
    MatIcon,
    CommonModule,
    RouterLink,
    MatSnackBarModule
  ],
  templateUrl: './listaralimentos.component.html',
  styleUrl: './listaralimentos.component.css',
})
export class ListaralimentosComponent {
  datasource: MatTableDataSource<Alimentos> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'accion01', 'accion02'];
  contador: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private aS: AlimentosService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.aS.list().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
      this.contador = data.length
      if (this.contador == 0) {
        this.showNoAlimentoSnackbar
      }
    });
    this.aS.getList().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
      this.contador = data.length;
    });
  }

  eliminar(id: number) {
    this.aS.delete(id).subscribe((data) => {
      this.aS.list().subscribe((data) => {
        this.aS.setList(data);
        this.datasource = new MatTableDataSource(data);
        this.contador = data.length;
        this.showDeleteSnackbar 
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
  showNoAlimentoSnackbar() {
    this.snackBar.open('No hay alimentos registrados', 'Cerrar', {
      duration: 10000,
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
