import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBowlFood, faEgg, faDumbbell, faUser, faUtensils, faCarrot, faBacon, faQuestion, faComment, faMedal } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    MatPaginator,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    FontAwesomeModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Fitfat';
  faBowlFood = faBowlFood;
  faEgg = faEgg;
  faDumbbell = faDumbbell;
  faUser = faUser;
  faUtensils = faUtensils;
  faCarrot = faCarrot;
  faBacon = faBacon;
  faQuestion = faQuestion;
  faComment = faComment;
  faMedal = faMedal;
}
