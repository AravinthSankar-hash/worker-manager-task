import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { COMMON_CONST } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class CreatetaskService {

  constructor(private _http: HttpClient) { }

  createTask(taskDetails: object, userToken: string): Observable<string> {
    return this._http.post(`${COMMON_CONST.SERVER_HOST}/task/create`, taskDetails, {
      headers: {
        "x-access-token": userToken
      }
    })
      .pipe(map((response: any) => {
        return response;
      }))
  }

  updateTask(taskDetails: object, userToken: string): Observable<string> {
    return this._http.post(`${COMMON_CONST.SERVER_HOST}/task/update`, taskDetails, {
      headers: {
        "x-access-token": userToken
      }
    })
      .pipe(map((response: any) => {
        return response;
      }))
  }

  fetchAllTasks(dataLimits: object, userToken: string): Observable<string> {
    return this._http.post(`${COMMON_CONST.SERVER_HOST}/task/all`, dataLimits, {
      headers: {
        "x-access-token": userToken
      }
    })
      .pipe(map((response: any) => {
        return response;
      }))
  }

  taskBasedOnState(stateDetails: object, userToken: string): Observable<string> {
    return this._http.post(`${COMMON_CONST.SERVER_HOST}/task/state`, stateDetails, {
      headers: {
        "x-access-token": userToken
      }
    })
      .pipe(map((response: any) => {
        return response;
      }))
  }

  searchTask(stateDetails: object, userToken: string): Observable<string> {
    return this._http.post(`${COMMON_CONST.SERVER_HOST}/task/search`, stateDetails, {
      headers: {
        "x-access-token": userToken
      }
    })
      .pipe(map((response: any) => {
        return response;
      }))
  }

  fetchWorkerTasks(payLoad: object, userToken: string): Observable<string> {
    return this._http.post(`${COMMON_CONST.SERVER_HOST}/task/worker`, payLoad, {
      headers: {
        "x-access-token": userToken
      }
    })
      .pipe(map((response: any) => {
        return response;
      }))
  }

  postFile(fileToUpload: File, userToken: string, taskID): Observable<boolean> {
    const endpoint = `${COMMON_CONST.SERVER_HOST}/task/upload`;
    const formData: FormData = new FormData();
    formData.append('sample', fileToUpload, fileToUpload.name);
    formData.set('taskID', taskID);
    return this._http
      .post(endpoint, formData, { headers: {
        "x-access-token": userToken
      } }).pipe(
      map(() => { return true; }));
  }
}
