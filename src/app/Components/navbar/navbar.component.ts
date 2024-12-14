import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../Services/authentication.service';
import {  Router } from '@angular/router';
import { CarritoService } from '../../Services/carrito.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  searchQuery: string = '';
  showCarrito: boolean = true;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private carritoService: CarritoService
  ) { }

  ngOnInit(): void {
    // Nos suscribimos al observable del carrito para detectar cambios
    this.carritoService.reloadCarrito$.subscribe(() => {
      this.reloadCarrito();
    });
  }

  reloadCarrito(): void {
    this.showCarrito = false; // Oculta el carrito (lo destruye)
    setTimeout(() => {
      this.showCarrito = true; // Lo vuelve a mostrar (se recrea)
    }, 1);
  }

  
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn(); 
  }

  
  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    return token ? this.authService.decodeRol(token) === 'admin' : false; 
  }

  
  search(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });
    }
  }

  
  logout(): void {
    this.authService.logout();
  }

  
  redirectToAdminPage(): void {
    this.router.navigate(['/admin/list-products']);
  }



}
