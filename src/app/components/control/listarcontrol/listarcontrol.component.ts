import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { Control } from '../../../models/control';
import { ControlService } from '../../../services/control.service';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-listarcontrol',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatInput, CommonModule],
  templateUrl: './listarcontrol.component.html',
  styleUrl: './listarcontrol.component.css',
})
export class ListarcontrolComponent implements OnInit {
  datasource: MatTableDataSource<Control> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];
  constructor(private cS: ControlService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
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
