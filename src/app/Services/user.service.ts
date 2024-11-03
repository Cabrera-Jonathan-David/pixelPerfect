
import { Injectable } from '@angular/core';
import { User } from '../Interface/user';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUsersUrl = 'http://localhost:3000/users';
  


constructor(private http: HttpClient){}

// METODO PARA CREAR UN USUARIO
async createUser(userData: any): Promise<any> {
  return await this.http.post(this.apiUsersUrl, userData).toPromise();
}


// METODO PARA VERIFICAR SI EXISTE UN USERNAME , ME DEVUELVE BOOLEANO
async checkUsernameExists(username: string): Promise<boolean> {
  const response = await this.http.get<any[]>(`${this.apiUsersUrl}?username=${username}`).toPromise();
  return Array.isArray(response) && response.length > 0; 
}

//METODO PARA OBTENER UN USUARIO POR USERNAME
async getUserByUsername(username: string): Promise<User | null> {
  const response = await this.http.get<User[]>(`${this.apiUsersUrl}?username=${username}`).toPromise();
  if (Array.isArray(response) && response.length > 0) {
      return response[0];
  }
  return null; 
}

//METODO PARA OBTENER UN USUARIO POR ID DEL CLIENTE
async getUserByClientId(clientId: string): Promise<User | null> {
  const response = await this.http.get<User[]>(`${this.apiUsersUrl}?id_cliente=${clientId}`);

  if (Array.isArray(response) && response.length > 0) {
    return response[0]; 
  }

  return null;
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
//-----------------------------------------------------------------------------------------------
async login(username: string, password: string): Promise<string | null> {
  const response = await this.http.get<User[]>(`${this.apiUsersUrl}?username=${username}`).toPromise();
  if (Array.isArray(response) && response.length > 0) {
    const user = response[0];
    if (user.password === password) {
      const token = this.generateToken(user); // Genera un token de usuario
      localStorage.setItem('token', token); // Guarda el token en localStorage
      localStorage.setItem('username', user.username); // aca guardo el user en la local storage
      return token; // Retorna el token para uso adicional si es necesario
    }
  }
  return null; 
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
