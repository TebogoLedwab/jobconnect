import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { environment } from "src/environments/environment";
import { User } from "../models/user";
import { StoreService } from "./store.service";
import { Router } from "@angular/router";
import { AlertService } from "./alert.service";

@Injectable({
  providedIn: "root",
})
export class UserService {

  SERVER_URL = environment.SERVER_URL;
  headers = new HttpHeaders().set("Content-Type", "application/json");
  user:any;
  constructor(
    private http: HttpClient,
    private storeService: StoreService,
    private httpClient: HttpClient,
    public router: Router,
    public alert: AlertService
  ) {}

  // returns all plug users in an array
  get_users(): Observable<Array<User>> {
    return this.http.get<User[]>(`${this.SERVER_URL}/users/get_all_users`);
  }

  // get user profile by id
  get_user_by_id(user_id: string): Observable<any> {
    return this.httpClient.get(`${this.SERVER_URL}/users/get_user/${user_id}`, {
      headers: this.headers,
    });
  }

  // register
  sign_up(user: User): Observable<any> {
    return this.httpClient.post(
      `${this.SERVER_URL}/users/register_users`,
      user
    );
  }

  // login
  sign_in(email: string, password: string) {
    return this.httpClient.post<any>(`${this.SERVER_URL}/users/login_users`, {
      email,
      password,
    });
  }

  // return a boolean true if user logged in
  get is_loggedIn(): boolean {
    let user = localStorage.getItem("user");
    return user !== null ? true : false;
  }

  // update a user
  update_users(id: any, data: any) {
    
    return this.httpClient.patch(
      `${this.SERVER_URL}/users/update_users/${id}`,
    data
    );
  }
  

  //lwhen user logs out
  logout() {
    localStorage.removeItem("user");
    this.storeService.set_user(null);
    this.router.navigate(["/"]);
    this.alert.success(`Logged out`);
  }

  // handle HTTP errors
  handleError(error: HttpErrorResponse) {
    let msg = "";
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(msg);
  }


}
