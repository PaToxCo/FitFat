import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Respuesta } from '../../../models/respuesta';
import { RespuestaService } from '../../../services/respuesta.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-listarrespuesta',
  standalone: true,
  imports: [
    MatTableModule, 
    MatPaginatorModule, 
    MatSortModule, 
    MatInputModule, 
    DatePipe
  ],
  templateUrl: './listarrespuesta.component.html',
  styleUrl: './listarrespuesta.component.css'
})
export class ListarrespuestaComponent implements OnInit{
  idConsulta!: number;
  datasource: MatTableDataSource<Respuesta> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['idConsulta', 'fechaRespuesta', 'asunto', 'descripcion'];
  constructor(
   
    private rS: RespuestaService,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['idConsulta']) {
        this.idConsulta = +params['idConsulta']; 
        this.cargarRespuestas();
      } else {
        console.warn('idConsulta no encontrado en la URL.');
      }
    });
    
  }
  cargarRespuestas(): void {
    this.rS.listarPorConsulta(this.idConsulta).subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }
}