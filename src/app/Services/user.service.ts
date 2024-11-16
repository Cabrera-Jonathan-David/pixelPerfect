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


  //-------------- METODOS ------------------------------

  async createUser(userData: any): Promise<any> {
    return await this.http.post(this.apiUsersUrl, userData).toPromise();
  }
     
  async checkUsernameExists(username: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(this.http.get<any[]>(`${this.apiUsersUrl}?username=${username}`));
      return response.length > 0;
    } catch (error) {
      console.error("Error fetching username:", error);
      return false;
    }
  }
                                
  async getUserByUsername(username: string): Promise<User | null> {
    try {
      const response = await firstValueFrom(this.http.get<User[]>(`${this.apiUsersUrl}?username=${username}`));
      return response.length > 0 ? response[0] : null;
    } catch (error) {
      console.error("Error fetching user by username:", error);
      return null;
    }
  }

  async getUserById(userId: string): Promise<User> {
    return firstValueFrom(this.http.get<User>(`${this.apiUsersUrl}/${userId}`));
  }
                           
  getAllUsers(): Promise<User[]> {
    return this.http.get<User[]>(this.apiUsersUrl).toPromise().then(users => {
      return users || []; 
    }).catch(error => {
      console.error('Error fetching users:', error);
      return []; 
    });
  }






}