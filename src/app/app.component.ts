import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { Location } from '@angular/common'; // Importa Location para controlar el cambio de hash
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBowlFood, faEgg, faDumbbell, faUser, faUtensils, faCarrot, faBacon, faQuestion, faComment, faMedal, faCode } from '@fortawesome/free-solid-svg-icons';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { LoginService } from './services/login.service';
import { filter } from 'rxjs';

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
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query('.animated-button.animate', [
          style({ opacity: 0, transform: 'translateY(-20px)' }),
          stagger(100, [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class AppComponent {
  title = 'Fitfat';
  role: string = '';
  usuario: string = '';
  isAuthenticated: boolean = false;
  currentRoute: string = ''; // Para detectar la ruta actual

  constructor(private loginService: LoginService, private router: Router, private location: Location) {
    // Escucha los cambios de rutas
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) // Solo cuando termine la navegación
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects;
      this.verificar(); // Verifica si el usuario está logueado en cada cambio de ruta
      
      // Verifica si la URL contiene un hash para determinar si es solo navegación interna
      if (this.isInternalNavigation()) {
        this.hideLoader();  // Si es solo un cambio de hash, oculta el loader
      } else {
        this.showLoader();  // Si es un cambio de ruta, muestra el loader
      }
    });
  }

  // Mostrar el loader
  showLoader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.opacity = '1';
      preloader.style.visibility = 'visible';
      setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        document.querySelectorAll('.animated-button').forEach((button, index) => {
          setTimeout(() => {
            button.classList.add('animate');
          }, 400 + index * 100); 
        });
      }, 1000); 
    }
  }

  // Ocultar el loader
  hideLoader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
      }, 1000); 
    }
  }

  // Método que verifica si la navegación es interna (es decir, solo un cambio de hash)
  isInternalNavigation(): boolean {
    // Comprobamos si la URL contiene un hash
    const currentHash = this.location.path().split('#')[1];
    return currentHash ? true : false;  // Si hay un hash, es una navegación interna
  }

  cerrar() {
    sessionStorage.clear();
  }

  ngOnInit() {
    this.verificar();
  }

  verificar() {
    this.isAuthenticated = this.loginService.verificar();  // Llama al método de loginService que valida el estado de la sesión
    if (this.isAuthenticated) {
      this.role = this.loginService.showRole();
      this.usuario = this.loginService.showUser();
    } else {
      this.role = '';
      this.usuario = '';
    }
  }

  verificarUser() {
    this.usuario = this.loginService.showUser();
  }

  isUser() {
    return this.role === 'PACIENTE';
  }

  isAdmin() {
    return this.role === 'ADMIN';
  }

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
  faCode = faCode;
}
