import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { Control } from '../../../models/control';
import { ControlService } from '../../../services/control.service';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInput, MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarcontrol',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatInput, CommonModule, RouterLink, MatIcon],
  templateUrl: './listarcontrol.component.html',
  styleUrl: './listarcontrol.component.css',
})
export class ListarcontrolComponent implements OnInit {
  datasource: MatTableDataSource<Control> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'accion01', 'accion02'];
  constructor(
    private cS: ControlService,
    private snackBar: MatSnackBar) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.datasource.data = data;
      this.datasource = new MatTableDataSource(data);
      if (data.length == 0) {
        this.snackBar.open('No hay Controles registrados', 'Cerrar', {
          duration: 5000,
        });
      }
    });
    this.cS.getList().subscribe((data) => {
      this.datasource = new MatTableDataSource(data);
    });
  }
    
  eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
        this.showDeleteSnackbar();
        if (data.length == 0) {
          this.showNoControlesSnackbar();
        }
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
  showNoControlesSnackbar() {
    this.snackBar.open('No hay Controles registrados', 'Cerrar', {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }
  showDeleteSnackbar() {
    this.snackBar.open('Control eliminado con éxito', 'Cerrar', {
      duration: 5000,
      verticalPosition: 'bottom', 
      horizontalPosition: 'center',
    });
  }
}
