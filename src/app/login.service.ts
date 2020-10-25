import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { COMMON_CONST } from "../constants/app.constants";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }

  public userToken: string = "";

  validateUser(userData: object): Observable<string> {
    return this._http.post(`${COMMON_CONST.SERVER_HOST}/user/login`, userData)
      .pipe(map((response: any) => {
        return response;
      }))
  }

  getAllUsers(userToken): Observable<string> {
    return this._http.get(`${COMMON_CONST.SERVER_HOST}/user/all`, {
      headers: {
        "x-access-token": userToken
      }
    })
      .pipe(map((response: any) => {
        return response;
      }))
  }
}
