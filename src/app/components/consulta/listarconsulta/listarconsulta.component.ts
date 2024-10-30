import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Consulta } from '../../../models/consulta';
import { ConsultaService } from '../../../services/consulta.service';

@Component({
  selector: 'app-listarconsulta',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatInput],
  templateUrl: './listarconsulta.component.html',
  styleUrl: './listarconsulta.component.css'
})
export class ListarconsultaComponent implements OnInit {
  datasource: MatTableDataSource<Consulta> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['c1', 'c2', 'c3','c4','c5'];
  constructor(private conS: ConsultaService) { }
  ngOnInit(): void {
    this.conS.list().subscribe((data) => {
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
