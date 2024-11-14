import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { Consulta } from '../../../models/consulta';
import { ConsultaService } from '../../../services/consulta.service';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarconsulta',
  standalone: true,
  imports: [
    RouterOutlet,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatInput,
    MatIconModule,
    RouterLink,
    CommonModule,
    MatIcon
  ],
  templateUrl: './listarconsulta.component.html',
  styleUrls: ['./listarconsulta.component.css'],
})
export class ListarConsultaComponent implements OnInit {
  datasource: MatTableDataSource<Consulta> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'fechaConsulta', 'asunto', 'descripcion', 'accionEliminar'];

  constructor(private consultaService: ConsultaService) {}

  ngOnInit(): void {
    this.consultaService.list().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.consultaService.delete(id).subscribe(() => {
      this.consultaService.list().subscribe((data) => {
        this.datasource.data = data;
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

}
