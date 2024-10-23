
import { Injectable } from '@angular/core';
import { User } from '../Interface/user';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUsuariosUrl = 'http://localhost:3000/users';
  


constructor(private http: HttpClient){}

registerUser(user: User): Promise<User>{

 return lastValueFrom(this.http.post<User>(this.apiUsuariosUrl, user));
}



comprobarUserNameExiste(username: string): Observable<User[]> {

  return this.http.get<User[]>(`${this.apiUsuariosUrl}?username=${username}`);
  
}









}
