import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarrol',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatInput, MatIcon, RouterLink],
  templateUrl: './listarrol.component.html',
  styleUrls: ['./listarrol.component.css'],
})
export class ListarrolComponent implements OnInit {
  datasource: MatTableDataSource<Rol> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3','accion01','accion02'];
  contador: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private rS: RolService,private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
      this.contador = data.length;
      if (this.contador === 0) {
        this.showNoRolesSnackbar();
      }
    });
  }
  eliminar(id: number) {
    this.rS.delete(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
        
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
  showNoRolesSnackbar() {
    this.snackBar.open('No hay roles registrados', 'Cerrar', {
      duration: 10000,
      verticalPosition: 'bottom', 
      horizontalPosition: 'center',
    });
  }
}
