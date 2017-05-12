
import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProtectedService {

  constructor(private http: Http){
  };

  testProtected() {
    return this.http.get('/api/protected/testcall', <RequestOptionsArgs>{ withCredentials: true })
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.log('error handled by handleError');
    console.log(error);

    return Observable.throw(error || "Server Error");
  }
}

export var PROTECTED_STATUS_CODES = {
  401: "Unauthenticated",
  500: "Oops.. Something went wrong"
}