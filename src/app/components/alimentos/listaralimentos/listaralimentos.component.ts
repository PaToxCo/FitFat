import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { Alimentos } from '../../../models/alimentos';
import { AlimentosService } from '../../../services/alimentos.service';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listaralimentos',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatInput,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './listaralimentos.component.html',
  styleUrl: './listaralimentos.component.css',
})
export class ListaralimentosComponent {
  datasource: MatTableDataSource<Alimentos> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7','c8','accion01','accion02'];
  constructor(private aS: AlimentosService) {}
  ngOnInit(): void {
    this.aS.list().subscribe((data) => {
      this.datasource.data = data;
    });
    this.aS.getList().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });
  }
    
  eliminar(id: number) {
    this.aS.delete(id).subscribe((data) => {
      this.aS.list().subscribe((data) => {
        this.aS.setList(data);
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
