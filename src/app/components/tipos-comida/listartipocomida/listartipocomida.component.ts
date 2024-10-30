import { Component, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Tipo_Comida } from '../../../models/tipo_comida';
import { TipoComidaService } from '../../../services/tipo-comida.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-listartipocomida',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatInput],
  templateUrl: './listartipocomida.component.html',
  styleUrl: './listartipocomida.component.css'
})
export class ListartipocomidaComponent {
  datasource: MatTableDataSource<Tipo_Comida> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private tS: TipoComidaService) { }
  ngOnInit(): void {
    this.tS.list().subscribe((data) => {
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
