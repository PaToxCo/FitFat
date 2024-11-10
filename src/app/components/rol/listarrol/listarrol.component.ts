import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-listarrol',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatInput],
  templateUrl: './listarrol.component.html',
  styleUrls: ['./listarrol.component.css'],
})
export class ListarrolComponent implements OnInit {
  datasource: MatTableDataSource<Rol> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private rS: RolService) {}

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
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
