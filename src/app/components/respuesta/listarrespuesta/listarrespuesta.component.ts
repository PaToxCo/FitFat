import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { RespuestaService } from '../../../services/respuesta.service';
import { Respuesta } from '../../../models/respuesta';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInput, MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarrespuesta',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatInput, CommonModule],
  templateUrl: './listarrespuesta.component.html',
  styleUrl: './listarrespuesta.component.css'
})
export class ListarrespuestaComponent {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  dataSource: MatTableDataSource<Respuesta> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private rS: RespuestaService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      console.log(data);
      this.dataSource.data = data;
      if (data.length == 0) {
        this.snackBar.open('No hay Respuestas registradas', 'Cerrar', {
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
