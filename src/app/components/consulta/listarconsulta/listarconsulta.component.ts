import { Component, ViewChild } from '@angular/core';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ConsultaService } from '../../../services/consulta.service';
import { Consulta } from '../../../models/consulta';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarconsulta',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatInput,
    CommonModule,
  ],
  templateUrl: './listarconsulta.component.html',
  styleUrl: './listarconsulta.component.css',
})
export class ListarconsultaComponent {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  dataSource: MatTableDataSource<Consulta> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private cS: ConsultaService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource.data = data;
      if (data.length == 0) {
        this.snackBar.open('No hay Consultas registradas', 'Cerrar', {
          duration: 5000,
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
