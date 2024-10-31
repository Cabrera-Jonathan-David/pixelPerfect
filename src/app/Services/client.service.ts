import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../Interface/client';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

private apiUrlClient = "http://localhost:3000/clients";

  constructor(private http: HttpClient) { }

  async checkDniExists(dni: string): Promise<boolean> {
    const response = await this.http.get<any[]>(`${this.apiUrlClient}?dni=${dni}`).toPromise();
    return Array.isArray(response) && response.length > 0; // Devuelve un booleano
  }

  async checkUserEmailExists(email: string): Promise<boolean> {
    const response = await this.http.get<any[]>(`${this.apiUrlClient}?email=${email}`).toPromise();
    return Array.isArray(response) && response.length > 0; // Devuelve un booleano
  }
  


  async createClient(clienteData: any): Promise<any> {
    return await this.http.post(this.apiUrlClient, clienteData).toPromise();
  }


async getClientById(id: string): Promise<Client | null> {
  const response = await this.http.get<Client>(`${this.apiUrlClient}/${id}`).toPromise();
  return response || null;
}

async updateClient(id: string, updatedData: Partial<Client>): Promise<void> {
  try {
    await this.http.put(`${this.apiUrlClient}/${id}`, updatedData).toPromise();
  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
    throw error;
  }
}






}
