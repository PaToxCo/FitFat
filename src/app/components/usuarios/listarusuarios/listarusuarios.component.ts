import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Usuarios } from '../../../models/usuarios';
import { UsuariosService } from '../../../services/usuarios.service';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-listarusuarios',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatInput, MatIconModule, RouterLink, MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './listarusuarios.component.html',
  styleUrls: ['./listarusuarios.component.css'],
})
export class ListarusuariosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7','accion01','accion02'];
  dataSource: MatTableDataSource<Usuarios> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private uS: UsuariosService) { }

  ngOnInit(): void {
    // Obtener datos de la API o servicio
    this.uS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.uS.getList().subscribe((data)=> {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  eliminar(id: number) {
    this.uS.delete(id).subscribe((data) => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
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
