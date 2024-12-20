import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table'
import { Comida } from '../../../models/comida';
import { ComidaService } from '../../../services/comida.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarcomida',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatInput, MatIconModule, RouterLink],
  templateUrl: './listarcomida.component.html',
  styleUrl: './listarcomida.component.css'
})
export class ListarcomidaComponent implements OnInit {
  datasource: MatTableDataSource<Comida> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'accion01', 'accion02'];
  constructor(private cS: ComidaService,
    private snackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.datasource.data = data;
      this.datasource = new MatTableDataSource(data);
      if (data.length == 0) {
        this.snackBar.open('No hay Comidas registradas', 'Cerrar', {
          duration: 5000,
        });
      }
    });
    this.cS.getList().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
        this.showDeleteSnackbar();
        if (data.length == 0) {
          this.showNoComidasSnackbar();
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
  showNoComidasSnackbar() {
    this.snackBar.open('No hay Comidas registradas', 'Cerrar', {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }
  showDeleteSnackbar() {
    this.snackBar.open('Comida eliminado con éxito', 'Cerrar', {
      duration: 5000,
      verticalPosition: 'bottom', 
      horizontalPosition: 'center',
    });
  }
}