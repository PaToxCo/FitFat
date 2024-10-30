import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table'
import { Comida } from '../../../models/comida';
import { ComidaService } from '../../../services/comida.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-listarcomida',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatInput],
  templateUrl: './listarcomida.component.html',
  styleUrl: './listarcomida.component.css'
})
export class ListarcomidaComponent implements OnInit {
  datasource: MatTableDataSource<Comida> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10'];
  constructor(private cS: ComidaService) { }
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
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
