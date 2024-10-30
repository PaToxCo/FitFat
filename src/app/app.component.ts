import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UsuariosComponent, MatToolbarModule,MatIconModule, MatMenuModule,MatButtonModule, RouterLink, MatPaginator, MatTableModule, MatSortModule, MatInputModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Fitfat';
}
