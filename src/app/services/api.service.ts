import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs/index';
import { map, catchError } from 'rxjs/operators';

import { ConfigService } from './config.service';
@Injectable()

// Api service will call all APIs of the apps. All the API request should call this API.
export class ApiService {
  loaderEmitter: EventEmitter<any> = new EventEmitter();
  loderVal: any;

  constructor(private http: HttpClient, private _configService: ConfigService) {

  }
  // Request method has following arguments
  // method => 'POST', 'GET', 'PUT', etc
  // url => The url of the module eg. For login it should 'api/login'. For system it should be 'api/system'.
  // params => The GET parameters in request.
  // data => The POST parameters in request.

  request(method, url, data, param, loderVal): Observable<any> {
    //Control loading indicator to show
    if (loderVal === true) {
      //Fire event to show loading indicator
      this.loaderEmitter.next(true);
    } else {
      this.loaderEmitter.next(false);
    }

    let endPoint = this._configService.getApiEndPoint();
    let apiURL = endPoint + url;

    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
      withCredentials: false
    };
    let body = JSON.stringify(data);

    let httpParams = this.toHttpParams(param);
    let request;
    if (method === 'post') {
      request = this.http.post(apiURL, body, options);
    } else if (method === 'get') {
      request = this.http.get(apiURL, { params: httpParams });
    }
    return request;
  }

  // search params data
  private toHttpParams(obj: Object): HttpParams {
    let params = new HttpParams();
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const val = obj[key];
        if (val !== null && val !== undefined) {
          params = params.append(key, val.toString());
        }
      }
    }
    return params;
  }

}
