import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Respuesta } from '../../../models/respuesta';
import { RespuestaService } from '../../../services/respuesta.service';

@Component({
  selector: 'app-listarrespuesta',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatInput],
  templateUrl: './listarrespuesta.component.html',
  styleUrl: './listarrespuesta.component.css'
})
export class ListarrespuestaComponent implements OnInit{
  datasource: MatTableDataSource<Respuesta> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['c1', 'c2', 'c3','c4'];
  constructor(private rS: RespuestaService) { }
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.datasource = new MatTableDataSource(data)
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
}
