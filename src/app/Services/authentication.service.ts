import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedIn: boolean = false;

  constructor(private router:Router) { }

  login(): void{

    this.loggedIn = true;
  }

  logout(): void{

    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  isLoggedIn(): boolean{

    return localStorage.getItem('token') !== null;;
  }



}
