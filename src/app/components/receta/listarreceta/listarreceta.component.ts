import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { Receta } from '../../../models/receta';
import { RecetaService } from '../../../services/receta.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarreceta',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatInput,
    MatIcon,
    RouterLink,
  ],
  templateUrl: './listarreceta.component.html',
  styleUrl: './listarreceta.component.css',
})
export class ListarrecetaComponent implements OnInit {
  datasource: MatTableDataSource<Receta> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'accion01',
    'accion02',
  ];
  constructor(private rS: RecetaService, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.datasource.data = data;
      this.datasource = new MatTableDataSource(data);
      if (data.length == 0) {
        this.snackBar.open('No hay Recetas registradas', 'Cerrar', {
          duration: 5000,
        });
      }
    });
    this.rS.getList().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.rS.delete(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
        this.showDeleteSnackbar();
        if (data.length == 0) {
          this.showNoRecetaSnackbar();
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

  showNoRecetaSnackbar() {
    this.snackBar.open('No hay Recetas registradas', 'Cerrar', {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }
  showDeleteSnackbar() {
    this.snackBar.open('Receta eliminada con éxito', 'Cerrar', {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }
}
