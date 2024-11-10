import { Component, ViewChild } from '@angular/core';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Objetivos } from '../../../models/objetivos';
import { ObjetivosService } from '../../../services/objetivos.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listarobjetivos',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatInput,
    RouterLink,
    MatIconModule
  ],
  templateUrl: './listarobjetivos.component.html',
  styleUrl: './listarobjetivos.component.css',
})
export class ListarobjetivosComponent {
  datasource: MatTableDataSource<Objetivos> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'accion01', 'accion02'];
  constructor(private oS: ObjetivosService) {}
  ngOnInit(): void {
    this.oS.list().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });
    this.oS.getList().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.oS.delete(id).subscribe((data) => {
      this.oS.list().subscribe((data) => {
        this.oS.setList(data);
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
