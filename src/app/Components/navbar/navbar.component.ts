import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  searchQuery: string = '';

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

}
