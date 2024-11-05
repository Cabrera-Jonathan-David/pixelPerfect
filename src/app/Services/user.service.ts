import { Injectable } from '@angular/core';
import { User } from '../Interface/user';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUsersUrl = 'http://localhost:3001/users';
  


constructor(private http: HttpClient){}

// METODO PARA CREAR UN USUARIO
async createUser(userData: any): Promise<any> {
  return await this.http.post(this.apiUsersUrl, userData).toPromise();
}


// METODO PARA VERIFICAR SI EXISTE UN USERNAME , ME DEVUELVE BOOLEANO
async checkUsernameExists(username: string): Promise<boolean> {
  try {
    const response = await firstValueFrom(this.http.get<any[]>(`${this.apiUsersUrl}?username=${username}`));
    return response.length > 0;
  } catch (error) {
    console.error("Error fetching username:", error);
    return false;
  }
}


//METODO PARA OBTENER UN USUARIO POR USERNAME
async getUserByUsername(username: string): Promise<User | null> {
  try {
    const response = await firstValueFrom(this.http.get<User[]>(`${this.apiUsersUrl}?username=${username}`));
    return response.length > 0 ? response[0] : null;
  } catch (error) {
    console.error("Error fetching user by username:", error);
    return null;
  }
}

//METODO PARA OBTENER UN USUARIO POR ID DEL CLIENTE
async getUserByClientId(clientId: string): Promise<User | null> {
  try {
    const response = await firstValueFrom(this.http.get<User[]>(`${this.apiUsersUrl}?id_cliente=${clientId}`));
    return response.length > 0 ? response[0] : null;
  } catch (error) {
    console.error("Error fetching user by client ID:", error);
    return null;
  }
}


// METODO PARA OBTENER TODOS LOS USUARIOS
getAllUsers(): Promise<User[]> {
  return this.http.get<User[]>(this.apiUsersUrl).toPromise().then(users => {
    return users || []; 
  }).catch(error => {
    console.error('Error fetching users:', error);
    return []; 
  });
}


// ---------------------- METODOS PARA SISTEMA DE TOKENS E IDENTIFICACION ------------------------
// ---------------------- MÉTODOS PARA SISTEMA DE TOKENS E IDENTIFICACIÓN ------------------------
async login(username: string, password: string): Promise<string | null> {
  try {
    const response = await firstValueFrom(this.http.get<User[]>(`${this.apiUsersUrl}?username=${username}`));
    if (response.length > 0) {
      const user = response[0];
      if (user.password === password) {
        const token = this.generateToken(user); // Genera un token de usuario
        localStorage.setItem('token', token); // Guarda el token en localStorage
        localStorage.setItem('username', user.username); // Guarda el usuario en localStorage
        return token; // Retorna el token para uso adicional si es necesario
      }
    }
    return null;
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
}

// Generador de token 
private generateToken(user: User): string {
  return btoa(JSON.stringify({ id: user.id, username: user.username })); // Crea un token sencillo codificado en base64
}

// Cierre de sesión
logout(): void {
  localStorage.removeItem('token'); // Elimina el token del almacenamiento
}

// Verificación de autenticación
isAuthenticated(): boolean {
  return localStorage.getItem('token') !== null; // Verifica si hay un token almacenado
}

}