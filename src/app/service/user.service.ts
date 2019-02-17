import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";

import { UserInterface } from "../models/models-interfaces";
import { isNullOrUndefined } from 'util';

@Injectable()
export class UserService {
  public url: string;

    constructor( private _http:HttpClient){}
      headers: HttpHeaders = new HttpHeaders({
        "Content-Type": "application/json"
      });

      loginuser(username: string, password: string): Observable<any> {
        const url_api = "https://d7ka3nqya8.execute-api.us-east-2.amazonaws.com/dev/login";
        return this._http
          .post<UserInterface>(
            url_api,
            { username, password },
            { headers: this.headers }
          )
          .pipe(map(data => data));
      }

      setUser(user: UserInterface): void {
        user.password = "***";
        let user_string = JSON.stringify(user);
        localStorage.setItem("currentUser", user_string);
      }
    
      setToken(token): void {
        localStorage.setItem("accessToken", token);
      }
      getToken() {
        return localStorage.getItem("accessToken");
      }
      
      getCurrentUser(): UserInterface {
        let userString = localStorage.getItem("currentUser");
        if(isNullOrUndefined(userString)) {
          return null;
        } else {
          let user: UserInterface = JSON.parse(userString);
          return user;
        }
      }

      logout(): void {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("currentUser");
      }
      
}