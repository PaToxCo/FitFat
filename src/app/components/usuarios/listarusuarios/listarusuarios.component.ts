import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Usuarios } from '../../../models/usuarios';
import { UsuariosService } from '../../../services/usuarios.service';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-listarusuarios',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatInput, MatIconModule, RouterLink, MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './listarusuarios.component.html',
  styleUrls: ['./listarusuarios.component.css'],
})
export class ListarusuariosComponent implements OnInit, AfterViewInit {
  usuario: Usuarios | null = null;
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7','accion01','accion02'];
  dataSource: MatTableDataSource<Usuarios> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private uS: UsuariosService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
  
    if (id) {
      const idNumber = Number(id);  
      if (!isNaN(idNumber)) {
        this.uS.listId(idNumber).subscribe(
          (data) => {
            this.dataSource.data = [data]; 
          },
          (error) => {
            console.error('Error al obtener usuario por id:', error);
            alert('Error al obtener el usuario');
          }
        );
      } else {
        console.error('El id no es un número válido');
        alert('El id proporcionado no es válido');
      }
    } else {
      this.uS.list().subscribe((data) => {
        this.dataSource.data = data;
      });
    }

    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
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
