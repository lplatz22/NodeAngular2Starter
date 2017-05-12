
import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class UnprotectedService {

  constructor(private http: Http){
  };

  testUnprotected() {
    return this.http.get('/api/unprotected/testcall', <RequestOptionsArgs>{ withCredentials: true })
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.log('error handled by handleError');
    console.log(error);

    return Observable.throw(error || "Server Error");
  }
}

export var UNPROTECTED_STATUS_CODES = {
  401: "Unauthenticated",
  500: "Oops.. Something went wrong"
}