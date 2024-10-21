
import { Injectable } from '@angular/core';
import { User } from '../Interface/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
public userList: User[] = [];

constructor(){}

registerUser(user: User): boolean {
  user.id = this.userList.length + 1;
  this.userList.push(user);
  console.log(this.userList);
  return true;
}











}
