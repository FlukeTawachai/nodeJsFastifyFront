import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Home } from '../../models/homeModel';


@Injectable({
  providedIn: 'root',
})
export class HomeService {
  REST_API: string = 'http://localhost:3002';

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) {}

  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  getHomeAll() {
    return this.httpClient.get(`${this.REST_API}/Home`);
  }

  
  getHome(project: String,id: String) {
    return this.httpClient.get(`${this.REST_API}/Home/${project}/${id}`);
  }

  // Add
  addHome(data: Home): Observable<any> {
    let API_URL = `${this.REST_API}/Home/Create`;
    return this.httpClient
      .post(API_URL, data,{headers: this.httpHeaders})
      .pipe(catchError(this.handleError));
  }

  // Update
  updateHome(data: Home): Observable<any> {
    let API_URL = `${this.REST_API}/Home/Update`;
    return this.httpClient
      .post(API_URL, data,{headers: this.httpHeaders})
      .pipe(catchError(this.handleError));
  }

  // Delete
  deleteHome(data: Home): Observable<any> {
    let API_URL = `${this.REST_API}/Home/Delete`;
    return this.httpClient
      .post(API_URL, data,{headers: this.httpHeaders});
  }
}
