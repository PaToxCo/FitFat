import { Component, ViewChild } from '@angular/core';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ConsultaService } from '../../../services/consulta.service';
import { Consulta } from '../../../models/consulta';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarconsulta',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatInput, CommonModule, MatSnackBarModule],
  templateUrl: './listarconsulta.component.html',
  styleUrl: './listarconsulta.component.css'
})
export class ListarconsultaComponent {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  contador: number = 0;
  dataSource: MatTableDataSource<Consulta> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private cS: ConsultaService,private snackBar: MatSnackBar) { }

  eliminar(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.cS.setList(data);
        this.contador = data.length;
        this.showDeleteSnackbar();
        if (this.contador == 0) {
          this.showNoDietasSnackbar();
        }
      });
    });
  }
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {

      this.dataSource.data = data;

      this.dataSource = new MatTableDataSource(data);
      this.contador = data.length;
      if (this.contador == 0) {
        this.showNoDietasSnackbar();
      }

    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.contador = data.length;
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
  showNoDietasSnackbar() {
    this.snackBar.open('No hay dietas registradas', 'Cerrar', {
      duration: 5000,
      verticalPosition: 'bottom', // Posición en la pantalla
      horizontalPosition: 'center',
    });
  }
  showDeleteSnackbar() {
    this.snackBar.open('Eliminado correctamente', 'Cerrar', {
      duration: 5000,
      verticalPosition: 'bottom', // Posición en la pantalla
      horizontalPosition: 'center',
    });
  }
}
