import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const API_URL = "https://json-server-eshopke.vercel.app";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Origin, Content-Type',
    'Access-Control-Allow-Methods': 'HEAD, GET, POST,OPTIONS, PUT, PATCH, DELETE'
  })
}

@Injectable()
export class ApiService {
  private fetchPostsApiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private fetchUsersApiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(
    private http: HttpClient,
  ) {}

  private formatErrors(error: any) {
    return  throwError(error.error);
  }

  get(path: string): Observable<any> {
    return this.http.get(`${API_URL}${path}`, httpOptions)
      .pipe(catchError(this.formatErrors));
  }

  getAboutDogFacts(): Observable<any> {
    return this.http.get('https://dogapi.dog/api/v2/facts?limit=5');
  }

  getRandomImageForDog(): Observable<any> {
    return this.http.get('https://dog.ceo/api/breeds/image/random');
  }

}
