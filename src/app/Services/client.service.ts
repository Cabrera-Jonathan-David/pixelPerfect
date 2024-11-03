import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../Interface/client';
import { firstValueFrom } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../Interface/user';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

private apiUrlClient = "http://localhost:3000/clients";

  constructor(
      private http: HttpClient,
      private userService: UserService
    ) { }

  
    //METODO PARA VALIDAR SI UN CLIENTE CON EL DNI YA SE ENCUENTRA ASOCIADO A UN USUARIO
    async validateDni(dni: string): Promise<{ exists: boolean; message: string }> {
      const users: User[] = await this.userService.getAllUsers(); 
      const clients: Client[] = (await this.http.get<Client[]>(this.apiUrlClient).toPromise()) || []; 
      
      // Obtener todos los DNIs asociados a los usuarios
      const dniExists = users.some(user => {
        const client = clients.find(client => client.id === user.id_cliente); 
        return client && client.dni === dni; 
      });
    
      if (dniExists) {
        return { exists: true, message: 'El DNI ya está registrado.' };
      }
    
      return { exists: false, message: '' };
    }

    //METODO PARA VALIDAR SI UN CLIENTE CON EL EMAIL YA SE ENCUENTRA ASOCIADO A UN USUARIO
    async validateEmail(email: string): Promise<{ exists: boolean; message: string }> {
      const users: User[] = await this.userService.getAllUsers(); 
      const clients: Client[] = await this.http.get<Client[]>(this.apiUrlClient).toPromise() || [];
  
      const emailExists = users.some(user => {
        const client = clients.find(client => client.id === user.id_cliente); 
        return client && client.email === email; 
      });
  
      if (emailExists) {
        return { exists: true, message: 'El correo electrónico ya está asociado a un cliente usuario.' };
      }
  
      return { exists: false, message: '' };
    }




//OBTENER UN CLIENTE POR ID
async getClientById(id: string): Promise<Client | null> {
  const response = await this.http.get<Client>(this.apiUrlClient + '/' + id).toPromise();
  return response || null;
}

// OBTENER CLIENTE POR DNI
async getClientByDni(dni: string): Promise<Client | null> {
  const response = await this.http.get<Client[]>(`${this.apiUrlClient}?dni=${dni}`);

  if (Array.isArray(response) && response.length > 0) {
    return response[0]; 
  }

  return null;
}



//METODO PARA ACTUALIZAR UN CLIENTE
async updateClient(id: string, updatedData: Partial<Client>): Promise<void> {
  try {
    await this.http.put(this.apiUrlClient + '/' + id, updatedData).toPromise();
  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
    throw error;
  }
}

//METODO PARA CREAR UN CLIENTE
async createClient(clienteData: any): Promise<any> {
  return await this.http.post(this.apiUrlClient, clienteData).toPromise();
}




}
