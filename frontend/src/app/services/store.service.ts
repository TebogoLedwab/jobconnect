import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';
import { Skill } from '../models/skills';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  

  private users: any = new BehaviorSubject<Array<User>>(null);
  private user: any = new BehaviorSubject<User>(null);
  // private skills:any = new BehaviorSubject<Skill>(null);

  constructor () {
    this.user = localStorage.getItem('user') ? new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user'))) : new BehaviorSubject<User>(null);
  }

  // return the current user
  get get_user (): User {
    return this.user.getValue();
  }

  // set the user
  set_user (user: User): void {
    this.user.next(user);
  }


  // return the current users
  get get_users (): Array<User> {
    return this.users.getValue();
  }

  // return the current user
  set_users (users: Array<User>): void {
    this.users.next(users);
  }

 
  


}
