import { Component } from '@angular/core';
import { AuthenticationService } from '../../Services/authentication.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  searchQuery: string = '';
  


  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn(); 
  }

  
  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    return token ? this.authService.decodeRol(token) === 'admin' : false; 
  }

  
  search(): void {
    // aca hay que poner la logica para buscar
  }

  
  logout(): void {
    this.authService.logout();
  }

  
  redirectToAdminPage(): void {
    this.router.navigate(['/admin/list-products']);
  }



}
