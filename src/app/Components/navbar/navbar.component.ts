import { Component } from '@angular/core';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  searchQuery: string = '';

  constructor(private authService: AuthenticationService) { }

  onFocus() {
    this.searchQuery = ''; 
  }

  onBlur() {
    if (!this.searchQuery) {
      this.searchQuery = 'Buscar'; 
    }
  }

  search() {
    console.log('Buscando:', this.searchQuery);
  }

  isLoggedIn(): boolean{
    
    return this.authService.isLoggedIn();
  }

  logout(){
    this.authService.logout();
  }








}
