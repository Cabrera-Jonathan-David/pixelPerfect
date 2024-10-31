import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedIn: boolean = false;

  constructor() { }

  login(): void{

    this.loggedIn = true;
  }

  logout(): void{

    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean{

    return localStorage.getItem('token') !== null;;
  }



}
