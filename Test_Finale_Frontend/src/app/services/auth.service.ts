
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of, retry, throwError } from 'rxjs';
import { UserLogin } from '../dto/UserLogin';
import { UserSignup } from '../dto/UserSignup';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  url = "http://localhost:8080/api/";

  login(utenteLogin: UserLogin) {
    return this.http.post(this.url + "auth/login", utenteLogin).pipe(
      catchError(this.handleError)
    )
  }

  signup(utenteSignup: UserSignup) {
    return this.http.post(this.url + "auth/signup", utenteSignup).pipe(
      catchError(this.handleError)
    );
  }

  isAuthenticated(): Observable<boolean> {
    let headers = new HttpHeaders();
    try {
      const token = this.storageService.getLocalToken();

      headers = headers.set('Authorization', 'Bearer ' + token);

      return this.http.get(this.url + 'auth/check', { headers, observe: 'response' }).pipe(
        map((response: HttpResponse<any>) => {
          return response.status === 200;
        }),
        catchError((error) => {
          return of(false);
        })
      );
    } catch (error) {
      return of(false);
    }
  }
  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
