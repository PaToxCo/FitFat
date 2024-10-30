import { Component, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Dieta } from '../../../models/dieta';
import { DietaService } from '../../../services/dieta.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-listardieta',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatInput],
  templateUrl: './listardieta.component.html',
  styleUrl: './listardieta.component.css'
})
export class ListardietaComponent {
  datasource: MatTableDataSource<Dieta> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dS: DietaService) { }
  ngOnInit(): void {
    this.dS.list().subscribe((data) => {
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
