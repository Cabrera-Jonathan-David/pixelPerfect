import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from '../Interface/user';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loggedIn: boolean = false;
  private apiUsersUrl = 'http://localhost:3001/users';

  constructor(
    private router:Router,
    private http: HttpClient,
    private userService: UserService) { }


  //Cambiar estado de autenticación
  setAuthenticated(): void{
    this.loggedIn = true;
  }

  // Cerrar sesión
  logout(): void{
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  //Verifica si el usuario esta loggeado
  isLoggedIn(): boolean{
    return localStorage.getItem('token') !== null;;
  }

  // Verificación de autenticación                             
  isAuthenticated(): boolean {
  return localStorage.getItem('token') !== null; 
}

// Obtener el id del Usuario del token                     
getUserIdFromToken(): string | null {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const payload = JSON.parse(atob(token)); 
      return payload.id || null; // Extrae el `id`
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  console.error('Token not found in localStorage');
  return null;
}

// Genera el token
private generateToken(user: User): string {
  return btoa(JSON.stringify({ id: user.id, rol: user.rol })); //CREA UN TOKEN CON ESOS PARAMETROS
}


// Autenticación del usuario
async authenticateUser(username: string, password: string): Promise<string | null> {
  try {
    const user = await this.userService.getUserByUsername(username);
    if (user && user.password === password) {
        const token = this.generateToken(user); // Genera un token de usuario
        localStorage.setItem('token', token); // Guarda el token en localStorage
        return token; // Retorna el token para uso adicional si es necesario
    }
    return null;
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
}







}
