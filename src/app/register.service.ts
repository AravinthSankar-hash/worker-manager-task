import { Injectable } from '@angular/core';
import { Observable } from  'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { COMMON_CONST } from "../constants/app.constants";


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _http: HttpClient) { }

  saveUser(userData: object): Observable<string> {
    return this._http.post(`${COMMON_CONST.SERVER_HOST}/user/add`, userData)
    .pipe(map( (response: any) => { 
      return response['data'];
    } ))
  }
}
